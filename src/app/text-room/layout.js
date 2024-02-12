"use client";
import RoomProvider from "@/components/room/RoomProvider";
import { useSetDeviceToken } from "@/lib/hooks";
// useSetDeviceToken
export default function RootLayout({ children }) {
  const status = useSetDeviceToken();
  console.log("stauts", status);
  return (
    <RoomProvider mode="text">
      <div className="overflow-hidden">{children}</div>
    </RoomProvider>
  );
}
