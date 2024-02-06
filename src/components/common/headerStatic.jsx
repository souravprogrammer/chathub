"use client";
import React, { useState } from "react";
import style from "@/styles/header.module.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CiMenuBurger } from "react-icons/ci";

function HeaderStatic() {
  const [open, setOpen] = useState(false);
  return (
    <div className={"fixed top-0 w-[100dvw] z-30 " + style.header}>
      <header
        data-open={open}
        className={
          "transition-all duration-300 container  py-4  data-[open=true]:bg-primary-foreground/50 data-[open=true]:md:bg-transparent md:bg-transparent"
        }
      >
        <div className="flex items-center justify-between">
          <div>
            <Link href={"/"}>
              <div className="p-2 rounded-lg  drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]">
                <Image
                  alt={"logo"}
                  src={"/logo_ban.png"}
                  width={150}
                  height={44}
                />
              </div>
            </Link>
          </div>

          <div className="hidden gap-4 md:flex">
            <Link href={"/"} className="font-bold">
              Home
            </Link>
            <Link href={"/about"} className="font-bold">
              About
            </Link>
            <Link href={"/contact"} className="font-bold">
              Contact
            </Link>
          </div>
          <div className="hidden md:block">
            <Link href={"/room"}>
              <Button variant="outline">Video Chat</Button>
            </Link>
          </div>
          <div className="block md:hidden lg:hidden">
            <Button variant="ghost" onClick={() => setOpen((s) => !s)}>
              <CiMenuBurger className="w-[24px] h-[24px]" />
            </Button>
          </div>
        </div>
        <div
          data-open={open}
          className="transition-all duration-300 flex flex-col items-center gap-4  data-[open=true]:h-[132px] h-0 overflow-hidden data-[open=true]:md:hidden md:hidden data-[open=true]:p-6"
        >
          <Link href={"/"} className="font-bold">
            Home
          </Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/contact"}>Contact</Link>
        </div>
      </header>
    </div>
  );
}

export default HeaderStatic;
