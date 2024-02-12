"use client";
import RoomProvider from "@/components/room/RoomProvider";
import { useSetDeviceToken } from "@/lib/hooks";
export default function RootLayout({ children }) {
  useSetDeviceToken();

  return (
    <RoomProvider mode="video">
      <div className="overflow-hidden">{children}</div>
    </RoomProvider>
  );
}
