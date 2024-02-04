"use client";
const {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useRef,
} = require("react");

const useMediaStream = ({ askPermission = false }) => {
  const [mediaStream, setMediaStream] = useState(null);
  const [isAllowed, setIsAllowed] = useState(!!askPermission);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        let getUserMedia =
          navigator.mediaDevices.getUserMedia ||
          navigator.mediaDevices.webkitGetUserMedia ||
          navigator.mediaDevices.mozGetUserMedia;
        const stream = await getUserMedia({
          video: { facingMode: "user" },
          audio: true,
        });
        setMediaStream(stream);
      } catch (err) {
        setError(err);
      }
    };

    if (!mediaStream && isAllowed) {
      getUserMedia();
    }

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream, isAllowed]);

  const AskPermission = () => {
    setIsAllowed(true);
  };

  return { mediaStream, error, AskPermission };
};

const useSound = (url) => {
  const soundRef = useRef(null);

  useLayoutEffect(() => {
    soundRef.current = new Audio(url);
    return () => {
      soundRef.current = null;
    };
  }, []);

  const play = () => {
    soundRef.current?.play();
  };
  return { play };
};
export { useMediaStream, useSound };
