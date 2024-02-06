import React from "react";
import Image from "next/image";

export const metadata = {
  title: "About",
  description: `Chat with strangers and meet new friends in modern,
   free and random chat rooms, anonymous &#38; No Registration Required.
    Perfect for Mobile Chats, Girls Chat, Stranger Chats - a great one-on-one chats alternative to Omegle text.`,
};

function Page() {
  return (
    <div className="flex px-4 py-[75px]  md:p-[75px] justify-center  min-h-[calc(100dvh-144px)]">
      <div className="flex flex-col items-center w-[100%] md:w-[56%] gap-2 ">
        <Image src="/logo_hub.webp" width={200} height={200} alt="logo" />
        <h2 className="h-3 mb-10 text-3xl font-bold">Our Story</h2>
        <div className="contents">
          <p className="text-center ">
            {`In today’s fast-paced world, it can be challenging to meet new people.
             That’s why we created Banter - to make it easier for people to connect with each other.
              Our platform allows you to chat with people from all over the world, 
              so you can expand your social circle and make meaningful connections. 
              In addition, our platform offers loads of features and tools to make your 
              chatting experience more enjoyable and interactive.
             Join us today and start exploring a whole new world of socializing!`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
