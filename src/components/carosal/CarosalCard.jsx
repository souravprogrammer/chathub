import React from "react";
import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

function CarosalCard({ content, name }) {
  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/3 sm:basis-1/1">
      <div className="p-1">
        <Card>
          <CardContent className="flex items-center justify-center p-6 aspect-square">
            <div className="flex flex-col h-full gap-2">
              <Image
                width={42}
                height={42}
                src={"/colon.svg"}
                className="text-white"
              />

              <p className="flex items-center flex-1">{content}</p>
              <div>
                <h5 className="text-lg font-bold">{name}</h5>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}

export default CarosalCard;
