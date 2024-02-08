import React from "react";
import Image from "next/image";

export const metadata = {
  title: "About",
  description: `Welcome to our modern chat platform where you can connect with strangers and
   forge new friendships effortlessly.
    Explore our free and random chat rooms designed for anonymity and convenience – no registration required.
     Our platform is optimized for mobile chats, girls chats, and stranger interactions,
      offering a seamless alternative to Omegle text. 
  Join us today and embark on meaningful one-on-one conversations in a safe and welcoming environment.`,
};

function Page() {
  return (
    <div className="flex px-4 py-[75px]  md:p-[75px] justify-center  min-h-[calc(100dvh-144px)]">
      <div className="flex flex-col items-center w-[100%] md:w-[56%] gap-2 ">
        <Image src="/logo_hub.webp" width={200} height={200} alt="logo" />
        <h2 className="h-3 mb-10 text-3xl font-bold">Our Story</h2>
        <div className="contents">
          <p className="text-center ">
            {`Making new friends might be difficult in today's fast-paced society.
             That's why we launched Banter: to make it simpler for people to interact with one another.
              Our platform enables you to communicate with individuals from all around the world.
              so you may broaden your social circle and form important relationships. 
              Our platform includes several features and tools to enhance your talking experience.
             Join us now to discover a whole new world of socialising!`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
