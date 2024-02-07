"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { IoMdSend } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import { PiChatTeardropTextBold } from "react-icons/pi";
import { useRoom } from "@/components/room/RoomProvider";
import { Events } from "@/lib/Events";
// import Header from "@/components/common/header";
// import Message from "@/components/room/Message";
// import AlertDialogRoom from "@/components/room/AlertDialoug";

import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/common/header"));
const AlertDialogRoom = dynamic(() => import("@/components/room/AlertDialoug"));
const Message = dynamic(() => import("@/components/room/Message"));
const Stream = dynamic(() => import("@/components/room/Stream"));

function Page() {
  const {
    io,
    meRef,
    state,
    dispatch,
    sendMessage: send,
    disconnectPeer,
    mediaStreamError,
    mediaStream,
    callPeer,
    isOpen,
    connectionError,
  } = useRoom();
  const [status, setStatus] = useState("waiting");
  const [startClicked, setStartClicked] = useState(false);
  const [responsiveChat, setResponsive] = useState(false);
  const [online, setOnline] = useState(0);

  const onlineUser = (data) => {
    setOnline(data.count);
  };
  useEffect(() => {
    const onDisconenct = () => {
      disconnectPeer({ emit: false });
    };
    const onPeerMatched = (data) => {
      io.emit("is_busy", data);
      // callPeer(data.peerId, data.id);
    };
    const onIncomingCall = () => {
      // peere will call me shortly here
      // console.log("incoming call request");
    };
    const onPeerStatus = (data) => {
      // console.log("peer status", data);

      if (data) {
        // setStatus("connected");

        callPeer(data.peerId, data.id);
      }
    };

    io?.on(Events.PEER_STATUS, onPeerStatus);

    io?.on(Events.PEERDISCONENCT, onDisconenct);
    io?.on(Events.PEER_MATCHED, onPeerMatched);
    io?.on(Events.INCOMING_CALL_REQUEST, onIncomingCall);
    io?.on("online", onlineUser);

    return () => {
      io?.off(Events.PEER_STATUS, onPeerStatus);
      io?.off(Events.PEERDISCONENCT, onDisconenct);
      io?.off(Events.PEER_MATCHED, onPeerMatched);
      io?.off(Events.INCOMING_CALL_REQUEST, onIncomingCall);
      io?.off("online", onlineUser);
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const message = new FormData(e.target).get("message");
    // const mes = { message: message, id: getPeerIdfromSession() };
    send(message);
    // datasend.current?.send(mes);
    // dispatch(setMessagesAction(mes));

    e.target?.reset();
  };
  const skip = async () => {
    disconnectPeer();
  };
  const start = async () => {
    setStartClicked(true);
    io.emit("start_looking");
  };
  useEffect(() => {
    if (state.connected) {
      setStartClicked(false);
    }
  }, [state]);

  return (
    <main className="relative flex flex-col overflow-hidden md:container">
      <div className="fixed md:relative top-0 left-0 z-10  bg-gradient-to-b from-[#000] md:from-transparent w-[100%]">
        <Header
          videoHeader={true}
          start={start}
          skip={skip}
          connected={state.connected}
          startClicked={isOpen ? startClicked : true}
        />
      </div>
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
      <div className="flex flex-row md:h-[calc(100dvh-75px)] h-[calc(100dvh)]">
        <div className="flex flex-col flex-1 gap-[1px] p-0 md:gap-2 md:p-2">
          <Stream stream={state.remoteStream} remote={true} online={online} />
          <Stream stream={mediaStream} muted />
        </div>
        <div
          className={`transition-all duration-300 ease-linear z-[20] border bg-background  border-indigo-200/20 h-[100dvh] md:h-[calc(100%)] w-[calc(100%-34px)] md:w-[400px] flex md:flex flex-col gap-2 p-2 absolute md:static top-0 ${
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
            {state?.messages?.length === 0 ? (
              <div className="flex justify-center">
                <p className="text-center text-primary/50 max-w-[450px] align-center p-4">
                  Start chatting now to connect with random strangers from
                  around the world. Be respectful and have fun
                </p>
              </div>
            ) : null}
            {state.messages.map((data, index) => {
              return (
                <Message
                  key={index}
                  type={data?.type}
                  text={data?.message}
                  self={data.id === meRef.current?._id}
                />
              );
            })}
          </div>
          <form
            className="flex bg-primary-foreground p-1 gap-1 overflow-hidden rounded-lg w-[100%]"
            onSubmit={sendMessage}
          >
            <input
              disabled={!state.connected}
              className="flex-1 bg-transparent focus:outline-none"
              placeholder="Type a message"
              name="message"
              required
            />
            <Button
              disabled={!state.connected}
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
        open={!!connectionError}
        title="Server Down"
        description={`We apologize, but our server is currently experiencing technical difficulties and is unavailable.
         Our team is working diligently to resolve the issue as quickly as possible. Thank you for your patience.`}
      >
        <Link href="/">home</Link>
      </AlertDialogRoom>
      <AlertDialogRoom
        open={!!mediaStreamError}
        title="Camera Not Detected"
        description={`Unable to initiate video call: A camera device was not detected.
         Please ensure that a compatible camera is connected and properly configured.
          Without a functioning camera, starting a video call is not possible.
           Kindly check your camera settings and connections, then try again. 
           If the issue persists, consider troubleshooting your camera hardware or contacting technical support for assistance.
            Thank you for your understanding.`}
      >
        <Link href="/">home</Link>
      </AlertDialogRoom>
    </main>
  );
}

export default Page;
