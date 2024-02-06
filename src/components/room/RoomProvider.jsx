"use client";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  useReducer,
  useCallback,
} from "react";
import { io } from "socket.io-client";
import { Peer } from "@/lib/PeerJs";
import { Events, PeerData, Message } from "@/lib/Events";
import { useMediaStream } from "@/lib/hooks";
import { useSound } from "@/lib/hooks";
const socket = io(process.env.NEXT_PUBLIC_SOCKET || "no_url");

const RoomContext = createContext();
const initialState = {
  remoteStream: null,
  connected: false,
  messages: [],
};
const Actions = {
  remoreStream: "remoreStream",
  reset: "reset",
  messages: "messages",
  roomid: "roomid",
  connected: "connected",
};
function setMessagesAction(payload) {
  return { type: Actions.messages, payload: payload };
}
function connectedAction(payload) {
  return { type: Actions.connected, payload: payload };
}
function remoreStreamAction(payload) {
  return { type: Actions.remoreStream, payload: payload };
}
function setRoomIdAction(payload) {
  return { type: Actions.roomid, payload: payload };
}
export function resetAction() {
  return { type: Actions.reset, payload: null };
}
function reducer(state, action) {
  switch (action.type) {
    case Actions.remoreStream:
      return { ...state, remoteStream: action.payload };
    case Actions.messages:
      return { ...state, messages: [...state.messages, action.payload] };
    case Actions.reset:
      return { ...initialState };
    case Actions.connected:
      return { ...state, connected: action.payload };
    default:
      return state;
  }
}
function RoomProvider({ children, mode }) {
  const meRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const messageSound = useSound("/audios/receive.mp3");
  const disconnectSound = useSound("/audios/disconnect.mp3");

  const Peerconenction = useRef({});
  const { mediaStream, error, AskPermission } = useMediaStream({
    askPermission: mode === "video",
  });

  const disconnectPeer = useCallback(async ({ emit = true } = {}) => {
    Peerconenction.current?.call?.close();
    Peerconenction.current?.dataChannel?.close();
    disconnectSound?.play();
    if (emit) {
      socket.emit(Events.PEERDISCONENCT);
    }
    Peerconenction.current = {};
    dispatch(resetAction(null));
  }, []);
  const peerEvents = useRef({
    onOpen: async (id) => {
      // console.log("open");
      setIsOpen(true);
      socket.emit(Events.CONNECTPEER, new PeerData(id, mode)); // telling server to look for the peers to conect
    },
    onData: async (data) => {
      // console.log("data=>", data);
      dispatch(setMessagesAction(data));
      messageSound.play();
    },
    onStream: async (remoreStream) => {
      // set the remore stream here
      // console.log("remore stream received");
      dispatch(remoreStreamAction(remoreStream));
    },
    onCall: async (call) => {
      // console.log("call");
      // closeCall.current = call;

      try {
        let getUserMedia =
          navigator.mediaDevices.getUserMedia ||
          navigator.mediaDevices.webkitGetUserMedia ||
          navigator.mediaDevices.mozGetUserMedia;
        const str = await getUserMedia({
          video: { facingMode: "user" },
          audio: true,
        });

        call.answer(str);
        Peerconenction.current.call = call;
        dispatch(connectedAction(true));
        call.on("stream", peerEvents.current.onStream);
        call.on("close", () => {
          // Call closed
          // console.log("call ended");
          call.close();
        });
      } catch (err) {
        // console.log("onCall error>>", err.message);
      }
    },
    onConnection: async (connection) => {
      // console.log("connection", connection);
      connection.on("open", () => {
        // datasend.current = connection;
        Peerconenction.current.dataChannel = connection;
        // console.log("chat connection open");
        connection.send(
          new Message("user joined", meRef.current._id, "status")
        );
        dispatch(connectedAction(true));
        connection.on("data", peerEvents.current.onData);
      });
    },
    onDisconnect: async () => {
      disconnectPeer();
    },
    onError: async (err) => {
      disconnectPeer();
    },
    onClose: async () => {
      disconnectPeer();
    },
    beforeUnloadHandler: () => {},
  });

  useEffect(() => {
    if (mode === "video") {
      if (!mediaStream) return;
    }

    // console.log("creating peer.. ");
    const peer = new Peer();
    meRef.current = peer;
    // peer?.on("open", peerEvents.current.onOpen);
    // setme(peer);
    meRef.current?.on("open", peerEvents.current.onOpen);
    meRef.current?.on("connection", peerEvents.current.onConnection);
    meRef.current?.on("call", peerEvents.current.onCall);
    meRef.current?.on("close", peerEvents.current.onClose);
    meRef.current?.on("error", peerEvents.current.onError);

    return () => {
      meRef.current?.off("open", peerEvents.current.onOpen);
      meRef.current?.off("connection", peerEvents.current.onConnection);
      meRef.current?.off("call", peerEvents.current.onCall);
      meRef.current?.off("close", peerEvents.current.onClose);
      meRef.current?.off("error", peerEvents.current.onError);
      // console.log("event dittached");

      // me?.destroy();
    };
  }, [mediaStream]);

  const sendMessage = useCallback((message) => {
    const mes = new Message(message, meRef.current._id, "message");
    // { message: message, id: meRef.current._id };
    dispatch(setMessagesAction(mes));
    Peerconenction.current.dataChannel?.send(mes);
  }, []);

  const callPeer = useCallback(
    async (id, socketId) => {
      // console.log("me", id, mediaStream);
      let getUserMedia =
        navigator.mediaDevices.getUserMedia ||
        navigator.mediaDevices.webkitGetUserMedia ||
        navigator.mediaDevices.mozGetUserMedia;
      // check from the backend here before call
      if (mode === "video") {
        const stream = await getUserMedia({
          video: { facingMode: "user" },
          audio: true,
        });
        const call = meRef.current?.call(id, stream);
        call?.on("stream", (incomingRemoteStream) => {
          // console.log("onStream");
          dispatch(remoreStreamAction(incomingRemoteStream));
          dispatch(connectedAction(true));
        });
        Peerconenction.current.call = call;
      }
      var conn = meRef.current?.connect(id);
      // onConnection
      conn?.on("open", function () {
        // Receive messages
        // console.log("data connection open");
        Peerconenction.current.dataChannel = conn;
        conn.send(new Message("user joined", meRef.current._id, "status"));
        dispatch(connectedAction(true));
        Peerconenction.current.dataChannel.on(
          "data",
          peerEvents.current.onData
        );
      });

      // dispatch(resetAction(null));
    },
    [mediaStream]
  );

  useEffect(() => {
    socket.connect();
    const err = (err) => {
      // console.log("error socket", err.message);
      setConnectionError(err.message);
    };
    const faild = (err) => {
      // console.log("faild socket", err.message);
      setConnectionError(err.message);
    };
    const connectServer = () => {
      setConnectionError(null);
    };
    socket.on("connect_error", err);
    socket.on("connect_failed", faild);
    socket.on("connect", connectServer);

    return () => {
      socket.close();
      socket?.off("connect_error", err);
      socket?.off("connect_failed", faild);
      socket?.off("connect", connectServer);

      setConnectionError(null);
    };
  }, []);
  useEffect(() => {
    // console.log("open is", isOpen);
  }, [isOpen]);

  return (
    <RoomContext.Provider
      value={{
        io: socket,
        disconnectPeer, // action
        sendMessage,
        state,
        dispatch,
        mediaStream,
        mediaStreamError: error,
        callPeer,
        meRef,
        isOpen,
        connectionError,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  const context = useContext(RoomContext);
  return context;
}

export default RoomProvider;
