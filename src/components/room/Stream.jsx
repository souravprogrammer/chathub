"use client";
import React, { useEffect, useRef } from "react";
import Loader from "./Loader";

export default function Stream({ stream, muted = false }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream]);
  return (
    <div className="relative flex items-center justify-center flex-1 overflow-hidden border rounded-sm bg-primary">
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
        <div className="w-[100%] h-[100%] bg-primary flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
