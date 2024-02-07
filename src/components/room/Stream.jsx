"use client";
import React, { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { Button } from "@/components/ui/button";
import { GoDotFill } from "react-icons/go";

export default function Stream({
  stream,
  muted = false,
  remote = false,
  status = "",
  online,
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
          className="h-[100%] aspect-video scale-x-[-1]"
          style={{
            objectFit: "cover",
          }}
          autoPlay
          playsInline
        />
      ) : (
        <>
          <div className="relative w-[100%] h-[100%]">
            <TVCanvas />
            {remote ? (
              <div className="text-green-400 absolute w-[100%] h-[100%] flex justify-center items-center top-0 left-0 bg-[rgba(0,0,0,0.6)] gap-1">
                <GoDotFill />
                <p className="text-green-400 ">{online} users online</p>
              </div>
            ) : null}
          </div>
        </>
        // <div className="w-[100%] h-[100%]  flex justify-center items-center flex-col gap-2">
        //   <Loader />
        //   <span className="text-white">{status}</span>
        // </div>
      )}
    </div>
  );
}
function TVCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let samples = [];
    let sampleIndex = 0;
    let scanOffsetY = 0;
    let scanSize = 0;
    const FPS = 50;
    const scanSpeed = FPS * 15; // 15 seconds from top to bottom
    const SAMPLE_COUNT = 10;

    const interpolate = (x, x0, y0, x1, y1) => {
      return y0 + (y1 - y0) * ((x - x0) / (x1 - x0));
    };

    const generateRandomSample = (context, w, h) => {
      const intensity = [];
      const factor = h / 50;
      const trans = 1 - Math.random() * 0.05;

      const intensityCurve = [];
      for (let i = 0; i < Math.floor(h / factor) + factor; i++)
        intensityCurve.push(Math.floor(Math.random() * 15));

      for (let i = 0; i < h; i++) {
        const value = interpolate(
          i / factor,
          Math.floor(i / factor),
          intensityCurve[Math.floor(i / factor)],
          Math.floor(i / factor) + 1,
          intensityCurve[Math.floor(i / factor) + 1]
        );
        intensity.push(value);
      }

      const imageData = context.createImageData(w, h);
      for (let i = 0; i < w * h; i++) {
        const k = i * 4;
        let color = Math.floor(36 * Math.random());
        color += intensity[Math.floor(i / w)];
        imageData.data[k] =
          imageData.data[k + 1] =
          imageData.data[k + 2] =
            color;
        imageData.data[k + 3] = Math.round(255 * trans);
      }
      return imageData;
    };

    const render = () => {
      context.putImageData(samples[Math.floor(sampleIndex)], 0, 0);

      sampleIndex += 20 / FPS; // 1/FPS == 1 second
      if (sampleIndex >= samples.length) sampleIndex = 0;

      const grd = context.createLinearGradient(
        0,
        scanOffsetY,
        0,
        scanSize + scanOffsetY
      );

      grd.addColorStop(0, "rgba(255,255,255,0)");
      grd.addColorStop(0.1, "rgba(255,255,255,0)");
      grd.addColorStop(0.2, "rgba(255,255,255,0.2)");
      grd.addColorStop(0.3, "rgba(255,255,255,0.0)");
      grd.addColorStop(0.45, "rgba(255,255,255,0.1)");
      grd.addColorStop(0.5, "rgba(255,255,255,1.0)");
      grd.addColorStop(0.55, "rgba(255,255,255,0.55)");
      grd.addColorStop(0.6, "rgba(255,255,255,0.25)");
      grd.addColorStop(1, "rgba(255,255,255,0)");

      context.fillStyle = grd;
      context.fillRect(0, scanOffsetY, canvas.width, scanSize + scanOffsetY);
      context.globalCompositeOperation = "lighter";

      scanOffsetY += canvas.height / scanSpeed;
      if (scanOffsetY > canvas.height) scanOffsetY = -(scanSize / 2);

      window.requestAnimationFrame(render);
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth / 2.5;
      canvas.height = canvas.width / (canvas.offsetWidth / canvas.offsetHeight);
      scanSize = canvas.offsetHeight / 2.5 / 3;

      samples = [];
      for (let i = 0; i < SAMPLE_COUNT; i++)
        samples.push(
          generateRandomSample(context, canvas.width, canvas.height)
        );
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas id="tv" ref={canvasRef} className="w-[100%] h-[100%]"></canvas>
  );
}
