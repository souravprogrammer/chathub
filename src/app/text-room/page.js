"use client";
import React, { useEffect, useState } from "react";

import Header from "@/components/common/header";
import { Events } from "@/lib/Events";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRoom } from "@/components/room/RoomProvider";
import { IoMdSend } from "react-icons/io";
import Message from "@/components/room/Message";
import { useSound } from "@/lib/hooks";
import dynamic from "next/dynamic";

import ReportDialouge from "@/components/room/ReportDialouge";
const AlertDialogRoom = dynamic(() => import("@/components/room/AlertDialoug"));

function Page() {
  const [startClicked, setStartClicked] = useState(false);
  const connecSound = useSound("/audios/connect.mp3");
  const [open, setOpen] = useState(false);

  const {
    io,
    meRef,
    state,
    sendMessage: send,
    disconnectPeer,
    callPeer,
    isOpen,
    connectionError,
  } = useRoom();

  useEffect(() => {
    const onDisconenct = () => {
      disconnectPeer({ emit: false });
      setStartClicked(false);
    };
    const onPeerMatched = (data) => {
      // Call the remore peer here
      // console.log("peer matched");

      callPeer(data.peerId, data.id, data);

      connecSound.play();
    };
    const onIncomingCall = () => {};
    const onPeerStatus = (data) => {
      if (data) {
        callPeer(data.peerId, data.id, data);
      }
    };

    io?.on(Events.PEER_STATUS, onPeerStatus);

    io?.on(Events.PEERDISCONENCT, onDisconenct);
    io?.on(Events.PEER_MATCHED, onPeerMatched);
    io?.on(Events.INCOMING_CALL_REQUEST, onIncomingCall);

    return () => {
      io?.off(Events.PEER_STATUS, onPeerStatus);

      io?.off(Events.PEERDISCONENCT, onDisconenct);
      io?.off(Events.PEER_MATCHED, onPeerMatched);
      io?.off(Events.INCOMING_CALL_REQUEST, onIncomingCall);
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const message = new FormData(e.target).get("message");
    send(message);
    e.target?.reset();
  };

  const skip = async () => {
    setStartClicked(false);

    disconnectPeer();
  };
  const start = async () => {
    setStartClicked(true);
    io.emit("start_looking");
  };
  // useEffect(() => {
  //   console.log("state ", state);
  // }, [state]);
  return (
    <main className="relative flex flex-col overflow-hidden md:container">
      <Header
        start={start}
        skip={skip}
        connected={state.connected}
        isOpen={isOpen}
        startClicked={isOpen ? startClicked : true}
      />
      <div
        className={`transition-all duration-300 ease-linear z-[20] border border-gray-100/10 h-[calc(100dvh-75px)] flex md:flex flex-col gap-2 p-2  top-0`}
      >
        <div
          data-te-perfect-scrollbar-init
          className="flex flex-col flex-1 gap-2 overflow-x-hidden overflow-y-scroll"
        >
          {/* state?.messages?.length === 0 */}
          {!state?.connected && state?.messages?.length === 0 ? (
            <div className="flex justify-center">
              <p className="text-center text-primary/50 max-w-[450px] align-center p-4">
                Start chatting now to connect with random strangers from around
                the world. Be respectful and have fun
              </p>
            </div>
          ) : null}
          {state.messages.map((data, index) => {
            return (
              <Message
                key={index}
                name={data?.name}
                type={data.type}
                text={data?.message}
                self={data.id === meRef.current?._id}
              />
            );
          })}
          {!state?.connected && state?.messages?.length > 0 ? (
            <>
              <div className="flex items-center justify-center gap-3">
                <p>💔 This chat has ended</p>
                <ReportDialouge name={state?.remotePeer?.name} />
              </div>
            </>
          ) : null}
        </div>
        <form
          className="flex p-1 px-2 gap-1 overflow-hidden rounded-lg w-[100%] bg-primary-foreground"
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

      <AlertDialogRoom
        // open={!!connectionError}
        title="Server Down"
        description={`We apologize, but our server is currently experiencing technical difficulties and is unavailable.
         Our team is working diligently to resolve the issue as quickly as possible. Thank you for your patience.`}
      >
        <div className="bg-red">
          asd
          <Link href="/">home</Link>
        </div>
      </AlertDialogRoom>
    </main>
  );
}

export default Page;
