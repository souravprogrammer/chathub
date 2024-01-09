"use client";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useReducer,
} from "react";
import { Button } from "@/components/ui/button";
import Stream from "@/components/room/Stream";
import { Peer } from "@/lib/PeerJs";
import Link from "next/link";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useMediaStream } from "@/lib/hooks";
import AlertDialogRoom from "@/components/room/AlertDialoug";
import { getPeerIdfromSession, setPeerIdfromSession } from "@/utils/functions";
import Message from "@/components/room/Message";
import { FaArrowRight } from "react-icons/fa";

import { IoMdSend } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import { PiChatTeardropTextBold } from "react-icons/pi";

export const dynamic = "force-dynamic";

async function getRoomId(id) {
  try {
    const res = await fetch("/api/room?id=" + id, { cache: "no-store" });
    return res.json();
  } catch (err) {
    return { error: err.message };
  }
}
async function addToQue(id) {
  try {
    const res = await fetch("/api/addque?id=" + id, { cache: "no-store" });
    return res.json();
  } catch (err) {
    return { error: err.message };
  }
}

const initialState = {
  remoreStream: null,
  messages: [],
  roomId: null,
};
const Actions = {
  remoreStream: "remoreStream",
  reset: "reset",
  messages: "messages",
  roomid: "roomid",
};
function setMessagesAction(payload) {
  return { type: Actions.messages, payload: payload };
}
function remoreStreamAction(payload) {
  return { type: Actions.remoreStream, payload: payload };
}
function setRoomIdAction(payload) {
  return { type: Actions.roomid, payload: payload };
}
function resetAction() {
  return { type: Actions.reset, payload: null };
}

function reducer(state, action) {
  switch (action.type) {
    case Actions.remoreStream:
      return { ...state, remoreStream: action.payload };
    case Actions.messages:
      return { ...state, messages: [...state.messages, action.payload] };
    case Actions.roomid:
      return { ...state, roomId: action.payload };
    case Actions.reset:
      return { ...initialState };
    default:
      return state;
  }
}
function Page() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [status, setStatus] = useState("");
  const [responsiveChat, setResponsive] = useState(false);
  const { mediaStream, error, AskPermission } = useMediaStream({
    askPermission: true,
  });
  const closeCall = useRef(null);
  const myPeer = useRef(null);
  const roomUnSub = useRef(null);
  const datasend = useRef(null);
  const startChat = async (id) => {
    try {
      const res = await addToQue(id);
      if (res.code === 1) {
        const room = await getRoomId(id);
        if (!!room.roomId) {
          // setRoomId(room.roomId);
          dispatch(setRoomIdAction(room.roomId));
        } else {
          // setRoomId(null);
          dispatch(setRoomIdAction(null));
        }
      }
    } catch (err) {
      console.log(err);
      // setRoomId(null);
      dispatch(setRoomIdAction(null));
    }
  };
  const peerEvents = useRef({
    onOpen: async (id) => {
      setPeerIdfromSession(id);
      console.log("onOpen");
      setStatus("Waiting...");
      startChat(id);
    },
    onData: async (data) => {
      console.log("data=>", data);

      dispatch(setMessagesAction(data));
      // setMessages((m) => [...m, data]);
    },
    onStream: async (remoreStream) => {
      // setRemoreStream(remoreStream);
      dispatch(remoreStreamAction(remoreStream));
    },
    onCall: async (call) => {
      console.log("call");
      closeCall.current = call;
      setStatus("connecting...");

      try {
        const str = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        call.answer(str);
        call.on("stream", peerEvents.current.onStream);
        call.on("close", () => {
          console.log("call ended");
          call.close();
          const id = getPeerIdfromSession();
          setStatus("Waiting...");

          startChat(id);
          // dispatch(remoreStreamAction(null));
          dispatch(resetAction(null));

          // setRemoreStream(null);
        });
      } catch (err) {
        console.log("onCall error>>", err.message);
      }
    },
    onConnection: async (connection) => {
      console.log("connection", connection);
      connection.on("open", () => {
        datasend.current = connection;
        console.log("chat connection open");
        connection.on("data", peerEvents.current.onData);
      });
    },
    onDisconnect: async () => {
      console.log("disconnect");
      closeCall.current?.close();
    },
    onError: async (err) => {
      console.log("err", err);
      const id = getPeerIdfromSession();
      setStatus("Waiting...");

      startChat(id);
    },
    onClose: async () => {
      console.log("call close peer");
    },
    beforeUnloadHandler: () => {
      closeCall.current?.close();
    },
  });

  useEffect(() => {
    if (!mediaStream) return;
    const id = getPeerIdfromSession();
    console.log("id", id);
    if (id) {
      myPeer.current = new Peer(id);
    } else {
      myPeer.current = new Peer();
    }
    myPeer.current.on("open", peerEvents.current.onOpen);
    myPeer.current?.on("call", peerEvents.current.onCall);
    myPeer.current?.on("connection", peerEvents.current.onConnection);

    myPeer.current?.on("close", peerEvents.current.onClose);

    myPeer.current?.on("disconnected", peerEvents.current.onDisconnect);

    myPeer.current.on("error", peerEvents.current.onError);
    return () => {
      myPeer.current?.off("open", peerEvents.current.onOpen);
      myPeer.current?.off("error", peerEvents.current.onError);
      myPeer.current?.off("call", peerEvents.current.onCall);
      myPeer.current?.off("close", peerEvents.current.onClose);

      myPeer.current?.off("connection", peerEvents.current.onConnection);

      myPeer.current?.destroy();
      myPeer.current = null;
    };
  }, [mediaStream]);

  const listenOnRoom = useCallback(
    async (room_id) => {
      if (typeof room_id !== "string") return () => {};
      return onSnapshot(doc(db, "room", room_id), async (d) => {
        const id = getPeerIdfromSession();
        const info = d.data();
        if (info?.caller === id) {
          const remotePeer = info.peers.find((f) => f !== id);
          if (remotePeer) {
            try {
              const str = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
              });
              console.log("calling...");
              let call = myPeer.current.call(remotePeer, str, {
                constraints: {
                  offerToReceiveAudio: true,
                  offerToReceiveVideo: true,
                },
              });
              setStatus("connecting...");
              const conn = myPeer.current.connect(remotePeer);
              conn.on("open", function () {
                datasend.current = conn;
                conn.on("data", function (data) {
                  console.log("Received", data);
                  dispatch(setMessagesAction(data));
                });
              });
              call.on("stream", (remoreStr) => {
                closeCall.current = call;
                console.log("remore stream", remoreStr);
                // setRemoreStream(remoreStr);
                dispatch(remoreStreamAction(remoreStr));
              });
              call.on("close", () => {
                console.log("call closed");

                const id = getPeerIdfromSession();
                setStatus("Waiting...");

                startChat(id);
                dispatch(remoreStreamAction(null));
              });
              call.on("error", (err) => {
                console.error("Failed to get remote stream", err);
              });
            } catch (err) {
              console.error("Failed to", err.message);
            }
          }
        }
      });
    },
    [state.roomId]
  );
  const sendMessage = (e) => {
    e.preventDefault();
    const message = new FormData(e.target).get("message");
    const mes = { message: message, id: getPeerIdfromSession() };
    datasend.current?.send(mes);
    dispatch(setMessagesAction(mes));
    // setMessages((m) => [...m, mes]);
    e.target?.reset();
  };
  const nextRoom = async () => {
    if (datasend.current || closeCall.current) {
      console.log("closing all the connection for new peer");
      datasend.current?.close();
      closeCall.current?.close();
      datasend.current = null;
      closeCall.current = null;

      dispatch(resetAction());
      const id = getPeerIdfromSession();
      startChat(id);
    }
  };
  useEffect(() => {
    if (!state.roomId) return;
    roomUnSub.current = listenOnRoom(state.roomId);
  }, [state.roomId]);

  useEffect(() => {
    window.addEventListener(
      "beforeunload",
      peerEvents.current.beforeUnloadHandler
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        peerEvents.current.beforeUnloadHandler
      );
    };
  }, []);

  return (
    <main className="relative flex flex-col overflow-hidden md:container">
      <header className="h-[75px] flex justify-between items-center container">
        <Link href="/">
          <h4 className="text-4xl font-bold">chatHub</h4>
        </Link>
        <Button onClick={nextRoom}>
          <div className="flex items-center gap-2">
            <span>Next Room</span>
            <FaArrowRight />
          </div>
        </Button>
      </header>
      <div className="absolute bottom-[34px] z-10 md:hidden lg:hidden right-[14px]">
        <Button
          variant="secondary"
          onClick={() => {
            setResponsive(true);
          }}
        >
          <PiChatTeardropTextBold />
        </Button>
      </div>
      <div className="flex flex-row h-[calc(100dvh-75px)]">
        <div className="flex flex-col flex-1 gap-2 p-2">
          <Stream stream={state.remoreStream} remote={true} status={status} />
          <Stream stream={mediaStream} muted />
        </div>
        <div
          className={`transition-all duration-300 ease-linear z-[20] border bg-white border-indigo-200 h-[100dvh] md:h-[calc(100%)] w-[calc(100%-34px)] md:w-[400px] flex md:flex flex-col gap-2 p-2 absolute md:static top-0 ${
            responsiveChat ? " left-[34px]" : "left-[110%]"
          }`}
        >
          <div className="flex md:hidden lg:hidden">
            <Button
              variant="outline"
              onClick={() => {
                setResponsive(false);
              }}
            >
              <IoArrowBackOutline />
              back
            </Button>
          </div>
          <div
            data-te-perfect-scrollbar-init
            className="flex flex-col flex-1 gap-2 overflow-x-hidden overflow-y-scroll"
          >
            {state.messages.map((data, index) => {
              getPeerIdfromSession();
              return (
                <Message
                  key={index}
                  text={data?.message}
                  self={data.id === getPeerIdfromSession()}
                />
              );
            })}
          </div>
          <form
            className="flex bg-[#F2F2F2] p-1 gap-1 overflow-hidden rounded-lg w-[100%]"
            onSubmit={sendMessage}
          >
            <input
              className="flex-1 bg-[#F2F2F2] placeholder-[#898989] focus:outline-none"
              placeholder="Type a message"
              name="message"
              required
            />
            <Button
              variant="ghost"
              className="bg=[#F2F2F2] text-[#D0D0D0]"
              size="icon"
              type="submit"
            >
              <IoMdSend />
            </Button>
          </form>
        </div>
      </div>

      <AlertDialogRoom
        open={!!error}
        title="Camera Not Detected"
        description={`Unable to initiate video call: A camera device was not detected. Please ensure that a compatible camera is connected and properly configured. Without a functioning camera, starting a video call is not possible. Kindly check your camera settings and connections, then try again. If the issue persists, consider troubleshooting your camera hardware or contacting technical support for assistance. Thank you for your understanding.`}
      >
        <Link href="/">home</Link>
      </AlertDialogRoom>
    </main>
  );
}

export default Page;
