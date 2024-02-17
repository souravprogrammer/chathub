"use client";
import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import CarosalCard from "./CarosalCard";
export function CarouselSize() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const reviews = [
    {
      reviewer: "SocialButterfly77",
      content:
        "Banterz is a revelation! I was feeling isolated lately, but this platform turned it all around. Now, I'm chatting away effortlessly, making connections that truly matter. It's like finding a new family online!",
    },
    {
      reviewer: "WanderlustWonderer",
      content:
        "I've wandered through many chat platforms, but Banterz caught my attention like no other. Its simplicity masks its brilliance - connecting me with people across continents, igniting friendships that span the globe. Cheers to Banterz for making the world feel smaller!",
    },
    {
      reviewer: "FreeSpirit23",
      content:
        "Banterz isn't just a platform; it's a lifeline for the socially adventurous. I was skeptical at first, but it quickly won me over. No spam, no nonsense - just genuine connections waiting to be made. Kudos to the team for creating something truly special!",
    },
    {
      reviewer: "ChattyCathy",
      content:
        "As someone who's tried every chat platform under the sun, Banterz stands out from the rest. It's more than just a place to talk; it's a community where friendships blossom and boundaries blur. Say goodbye to loneliness - Banterz is here to stay!",
    },
    {
      reviewer: "GlobeTrotter99",
      content:
        "From skepticism to admiration - Banterz won me over in no time. It's like the United Nations of chat platforms, bringing people from all walks of life together in one virtual space. If you haven't tried it yet, you're missing out on a global conversation!",
    },
    {
      reviewer: "ChatConnoisseur42",
      content:
        "Banterz is the gold standard of online chat. Gone are the days of endless spam and meaningless chatter. With Banterz, every conversation feels meaningful, every connection genuine. If you're tired of the same old chat routine, it's time to switch to Banterz!",
    },
    {
      reviewer: "WanderlustDreamer",
      content:
        "Banterz is a breath of fresh air in the crowded world of chat platforms. It's intuitive, engaging, and most importantly, authentic. Whether you're looking for friendship or just a good conversation, Banterz has got you covered. Two thumbs way up!",
    },
    {
      reviewer: "SocialiteSara",
      content:
        "If you're tired of superficial connections and meaningless small talk, look no further than Banterz. It's more than just a chat platform - it's a gateway to meaningful relationships and unforgettable conversations. Trust me, once you try Banterz, you'll never look back!",
    },
    {
      reviewer: "GlobalGossipGirl",
      content:
        "Banterz is my go-to for meaningful conversations and genuine connections. It's like having the world at your fingertips, with endless possibilities for friendship and adventure. Whether you're chatting with someone across the street or across the globe, Banterz brings people together like never before!",
    },
    {
      reviewer: "WandererAtHeart",
      content:
        "Banterz is a game-changer for anyone craving authentic connections in a digital world. It's easy to use, spam-free, and filled with interesting people from all corners of the globe. Thanks to Banterz, I've made friends I never thought possible. Here's to many more memorable conversations!",
    },
  ];

  return (
    <div className="flex justify-center overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm md:max-w-[782px] lg:max-w-[1082px]"
      >
        <CarouselContent>
          {reviews.map((review, i) => (
            <CarosalCard
              key={i}
              content={review.content}
              name={review.reviewer}
            />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
