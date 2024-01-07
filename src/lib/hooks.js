"use client";
const { useState, useEffect, useCallback } = require("react");

const useMediaStream = () => {
  const [mediaStream, setMediaStream] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setMediaStream(stream);
      } catch (err) {
        setError(err);
      }
    };

    if (!mediaStream) {
      getUserMedia();
    }

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  return { mediaStream, error };
};

export { useMediaStream };
