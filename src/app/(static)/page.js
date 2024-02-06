import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import style from "@/styles/header.module.css";

export default function Home() {
  return (
    <>
      <main className="relative pb-6">
        <div className="relative flex flex-col  align-center h-[75dvh] z-10 bg-gradient-to-b from-indigo-500">
          <Image
            src="/banner.svg"
            alt="Follow us on Twitter"
            priority
            width={900}
            height={900}
            className="w-[100%] h-[75dvh] absolute"
          />
          <Image
            src="/bubbles.svg"
            alt="Follow us on Twitter"
            className={
              "w-[100%] h-[75dvh] absolute opacity-0 top-[40px] " + style.banner
            }
            priority
            width={900}
            height={900}
          />
          <div className="container relative flex-1">
            <article className="left-0  absolute flex flex-row justify-center flex-1 py-10 gap-x-10 align-center w-[100%] h-[100%]">
              <div className="flex flex-col justify-center text-center gap-y-7 align-center">
                <h4 className="text-5xl font-bold leading-relaxed">
                  Talk to strangers,
                  <br /> Make Friends!
                </h4>

                <p className="max-w-[900px]">
                  Experience an exciting free random chat alternative to Find
                  friends, connect with strangers, and talk with different
                  people in random anonymous chat rooms. No registration
                  required.
                </p>
                <div className="flex items-center justify-center gap-2 px-1">
                  <Link href="/room">
                    <Button variant="outline">Video Chat</Button>
                  </Link>
                  <p className="font-semibold">or</p>
                  <Link href="/text-room">
                    <Button variant="outline">Text Chat</Button>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="container flex flex-col items-center gap-2 pb-10">
          <Badge size="large" className="text-[0.9rem]">
            Reach people like you
          </Badge>
          <h3 className="py-4 text-3xl font-bold text-center text-balance">
            Anonymous Chat, Meet new people
          </h3>
          <p className="text-center text-primary/95  max-w-[930px]">
            Find female and male strangers worldwide, the new modern Omegle
            alternative. Connect with real people, enjoy ad free chats, and
            build genuine relationships.
          </p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col gap-2 md:flex-row lg:flex-row">
            <div className="flex-1 max-w-[550px] p-6 gap-4 flex flex-col">
              <h2 className="text-2xl font-bold">
                Chat with Random Strangers With Similar Interests
              </h2>
              <p>
                Talk to online strangers who love what you love, Chat about
                hobbies and enjoy fun conversations - all from one place!
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src={"/features_1.png"}
                alt="Woman using a laptop"
                width={360}
                height={510}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 md:flex-row lg:flex-row">
            <div className="flex items-center justify-center">
              <Image
                src={"/features_2.png"}
                alt="Woman using a laptop"
                width={360}
                height={510}
              />
            </div>
            <div className="flex-1 max-w-[550px] p-6 gap-4 flex flex-col">
              <h2 className="text-2xl font-bold">From Strangers to Friends</h2>
              <p>
                {`Turn random online chats with strangers into lasting
                friendships, our features makes it easy to add someone you've
                hit it off with and catch up on past conversations.`}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}