"use client";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { dataBrands } from "./SliderBrands.data";
import { Reveal } from "@/components/Shared/Reveal";

export function SliderBrands() {
  return (
    <Reveal position="down" className="flex gap-x-20 justify-center lg:pb-20 mt-5 mb-10">
      <Carousel
        className="w-full max-w-6xl mx-auto"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="ml-4">
          {dataBrands.map((brand) => (
            <CarouselItem key={brand.url} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                <Image
                  src={brand.url}
                  alt={brand.alt}
                  width={90}
                  height={90}
                  className="object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Reveal>
  );
}
