import React from "react";
import style from "@/styles/header.module.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function HeaderStatic() {
  return (
    <div className={"fixed top-0 w-[100dvw] z-30 " + style.header}>
      <header
        className={"container flex justify-between py-4 "}
        // style={header_style.header}
      >
        <h4 className="text-4xl font-bold">
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
          {/* Banter */}
        </h4>
        <div>
          <Link href={"/about"}>About</Link>
          <Link href={"/about"}>Contact</Link>
        </div>
        <div>
          <Button variant="outline">Video Chat</Button>
        </div>
      </header>
    </div>
  );
}

export default HeaderStatic;
