import { Inter, Signika } from "next/font/google";
import Head from "next/head";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
const signika = Signika({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Banter - Talk to strangers",
    template: "%s Banter - Talk to strangers",
  },
  manifest: "/manifest.json",
  siteName: "Banter",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  twitter: {
    card: "summary_large_image",
  },
  description: `Connect with strangers and expand your social circle in contemporary,
   cost-free, and spontaneous chat rooms without the need for registration.
    Enjoy anonymity and seamless interactions. Tailored for mobile users,
     female-centric conversations, and casual exchanges akin to Omegle text.
      Discover a perfect one-on-one chat alternative for vibrant interactions!`,
};
export const viewport = {
  themeColor: "#020817",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={signika.className}>{children}</body>
    </html>
  );
}
