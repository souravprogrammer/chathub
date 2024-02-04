"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

function Header({
  nextRoom,
  disableButton = true,
  skip,
  start,
  connected,
  startClicked,
  videoHeader,
}) {
  console.log("startclicked", startClicked);
  return (
    <header className="h-[75px] flex justify-between items-center container">
      <Link href="/">
        {/* <h4
          className={
            videoHeader
              ? "text-4xl font-bold opacity-[0.8] md:opacity[1]"
              : "text-4xl font-bold"
          }
        >
          Banter
        </h4> */}
        <Image alt={"logo"} src={"/logo_ban.png"} width={150} height={44} />
      </Link>

      {connected ? (
        <Button onClick={skip} variant="destructive">
          skip
        </Button>
      ) : (
        <Button disabled={startClicked} onClick={start}>
          <div className="flex items-center gap-2">
            <span>start</span>
          </div>
        </Button>
      )}
    </header>
  );
}

export default Header;
