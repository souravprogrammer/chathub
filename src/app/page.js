import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <header
        className="container flex justify-between py-4"
        // style={{ border: "1px solid red" }}
      >
        <h4 className="text-4xl font-bold">chatHub</h4>
        <div>
          <Button>Video Chat</Button>
        </div>
      </header>
      <main className="container">
        <article className="flex flex-row py-10 gap-x-10">
          <div className="flex flex-col max-w-[550px] gap-y-7">
            <h4 className="text-5xl font-bold leading-relaxed">
              New Connections Await in Our Cyber Community{" "}
            </h4>
            <p>
              Meet and interact with countless online users, engage in
              stimulating chats and video calls.{" "}
            </p>
            <div className="flex items-center gap-2 px-1">
              <Link href="/room">
                <Button>Video Chat</Button>
              </Link>
              <p className="font-semibold">or</p>
              <Link href="/room">
                <Button>Text Chat</Button>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="h-[500px] bg-center bg-cover bg-no-repeat bg-[url('https://res.cloudinary.com/storylens/image/upload/v1704451955/ivcjveb8j4eghkfc7zri.jpg')]"></div>
          </div>
        </article>
      </main>
    </>
  );
}
