"use client";
import Cookies from "universal-cookie";
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
const useNotification = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Request permission for browser notifications
    Notification.requestPermission().then((permission) => {
      console.log("Notification permission:", permission);
    });
  }, []);

  const showNotification = (title, options) => {
    if (!("Notification" in window)) {
      // console.error("This browser does not support system notifications");
    } else if (Notification.permission === "granted") {
      // If permission is granted, show the notification
      const newNotification = new Notification(title, options);
      setNotification(newNotification);
    } else if (Notification.permission !== "denied") {
      // If permission has not been granted or denied, request permission again
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const newNotification = new Notification(title, options);
          setNotification(newNotification);
        }
      });
    }
  };

  return { showNotification, notification };
};
const useSetDeviceToken = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SOCKET) {
      const cookie = new Cookies();

      fetch(
        process.env.NEXT_PUBLIC_SOCKET +
          "/device?deviceToken=" +
          cookie.get("deviceToken"),
        {
          cache: "no-store",
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.token) {
            cookie.set("deviceToken", res.token);
          }
          console.log("set", res);
          res.token;
        })
        .catch((err) => {
          console.log("error while setting", err);
        });
    }
  }, []);
};
export { useMediaStream, useSound, useNotification, useSetDeviceToken };
