import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { BiLogoInstagramAlt } from "react-icons/bi";

import { FaTwitter } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 p-4 bg-primary-foreground/80">
      <div className="container flex justify-between gap-2 p-4">
        <div>
          {/* <h1>Banter</h1> */}
          <Image alt={"logo"} src={"/logo_ban.png"} width={150} height={44} />
        </div>
        {/* <div className="flex items-center justify-center flex-1 gap-8">
          <Link href="#">Terms of service</Link>
          <Link href="#">Privacy Policy</Link>
        </div> */}
        <div className="flex gap-2">
          <Button variant="outline">
            <BiLogoInstagramAlt />
          </Button>
          <Button variant="outline">
            <FaTwitter />
          </Button>
          <Button variant="outline">
            <FaDiscord />
          </Button>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center flex-1 gap-8">
          <Link href="/terms">Terms of service</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="/guidelines">Community Guidelines</Link>
        </div>
      </div>
      <p>All rights reserved. Banter 2024</p>
    </footer>
  );
}

export default Footer;
