import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import prisma from '@/lib/db';
import Image from 'next/image';
import Banner from '../../../../public/Banner.jpg';

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return data;
}

export default async function Hero() {
  const data = await getData();

  return (
    <Carousel>
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
