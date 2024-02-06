import { Inter } from "next/font/google";
import HeaderStatic from "@/components/common/headerStatic";
import Footer from "@/components/common/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Banter - Talk to strangers",
  description: `Chat with strangers and meet new friends in modern,
   free and random chat rooms, anonymous &#38; No Registration Required.
    Perfect for Mobile Chats, Girls Chat, Stranger Chats - a great one-on-one chats alternative to Omegle text.`,
};
export default function RootLayout({ children }) {
  return (
    <div className="relative min-h-[100dvh] flex flex-col">
      <HeaderStatic />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
