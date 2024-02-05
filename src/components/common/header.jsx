"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { useRoom } from "@/components/room/RoomProvider";
import Loader from "../room/Loader";

function Header({
  nextRoom,
  disableButton = true,
  skip,
  start,
  connected,
  startClicked,
  videoHeader,
}) {
  const [online, setOnline] = useState(0);
  const { io } = useRoom();

  useEffect(() => {
    const onlineUser = (data) => {
      setOnline(data.count);
    };

    io?.on("online", onlineUser);
    return () => {
      io?.off("online", onlineUser);
    };
  }, []);

  return (
    <header className="h-[75px] flex justify-between items-center container">
      <Link href="/">
        <Image alt={"logo"} src={"/logo_ban.png"} width={150} height={44} />
      </Link>

      <div className="flex items-center gap-6">
        <p className="text-green-400">{online} online</p>

        {connected ? (
          <Button onClick={skip} variant="destructive">
            skip
          </Button>
        ) : (
          <Button disabled={startClicked} onClick={start}>
            <div className="flex items-center gap-2">
              <span>start</span>
              {startClicked ? (
                <div className="scale-[0.5]">
                  <Loader />
                </div>
              ) : null}
            </div>
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
