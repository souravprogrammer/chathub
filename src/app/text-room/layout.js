"use client";
import RoomProvider from "@/components/room/RoomProvider";
import { useSetDeviceToken } from "@/lib/hooks";
// useSetDeviceToken
export default function RootLayout({ children }) {
  useSetDeviceToken();
  return (
    <RoomProvider mode="text">
      <div className="overflow-hidden">{children}</div>
    </RoomProvider>
  );
}
