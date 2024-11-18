// HeroCarousel.jsx
'use client';
import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

interface iApps {
  id: string;
  title: string;
  imageString: string;
  createdAt: Date;
}

export default function HeroCarousel({ data }: { data: iApps[] }) {
  console.log('Data', data);
  if (data.length === 0) {
    console.warn('Warning: No data passed to HeroCarousel');
  }
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full">
              <Image
                alt="Banner Image"
                src={item.imageString}
                width="0"
                height="0"
                sizes="100vw"
                // className="w-full h-[330px] object-contain object-center"
                className="object-cover rounded-md w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] max-sm:object-cover max-md:object-contain"
              />
              {/* <div className="absolute top-6 left-6 bg-opacity-75 bg-black text-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105">
              <h1 className="text-xl lg:text-2xl font-bold">{item.title}</h1>
            </div> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-14 md:ml-12 lg:ml-24" />
      <CarouselNext className="mr-14 md:mr-12 lg:mr-24" />
    </Carousel>
  );
}
