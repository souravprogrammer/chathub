"use client";
import React, { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { Button } from "@/components/ui/button";

export default function Stream({
  stream,
  muted = false,
  remote = false,
  status = "",
}) {
  const videoRef = useRef(null);
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    if (remote) {
      setAllow(!!stream);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream]);
  return (
    <div className="relative flex items-center justify-center flex-1 overflow-hidden rounded-sm bg-primary-foreground/80">
      {!!stream && allow ? (
        <div className="absolute w-[100%] h-[100%] bg-[#b7b0b0]  flex justify-center items-center flex-col gap-4 backdrop-blur-[100px] z-[5]">
          <p>You are currently hiding your partners video.</p>
          <Button
            onClick={() => {
              setAllow(false);
              // console.log("click");
            }}
          >
            Allow Video
          </Button>
        </div>
      ) : null}
      {!!stream ? (
        <video
          muted={muted}
          ref={videoRef}
          className="h-[100%] aspect-video"
          style={{
            objectFit: "contain",
          }}
          autoPlay
          playsInline
        />
      ) : (
        <div className="w-[100%] h-[100%]  flex justify-center items-center flex-col gap-2">
          <Loader />
          <span className="text-white">{status}</span>
        </div>
      )}
    </div>
  );
}
