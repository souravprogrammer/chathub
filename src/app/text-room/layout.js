"use client";
import RoomProvider from "@/components/room/RoomProvider";
export default function RootLayout({ children }) {
  return (
    <RoomProvider mode="text">
      <div className="overflow-hidden">{children}</div>
    </RoomProvider>
  );
}
