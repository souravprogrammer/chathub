import { Inter, Signika } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
const signika = Signika({ subsets: ["latin"] });

export const metadata = {
  title: "Banter - Talk to strangers",
  description: `Chat with strangers and meet new friends in modern,
   free and random chat rooms, anonymous &#38; No Registration Required.
    Perfect for Mobile Chats, Girls Chat, Stranger Chats - a great one-on-one chats alternative to Omegle text.`,
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={signika.className}>{children}</body>
    </html>
  );
}
