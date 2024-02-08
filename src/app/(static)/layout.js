import { Inter } from "next/font/google";
import HeaderStatic from "@/components/common/headerStatic";
import Footer from "@/components/common/footer";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <div className="relative min-h-[100dvh] flex flex-col">
      <HeaderStatic />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
