import Image from 'next/image';
import placeHolder from '../../../../public/placeholder.jpg';
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import prisma from '@/lib/db';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

async function fetchCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

const Handpicked = async () => {
  const categories = await fetchCategories();

  return (
    <Carousel className="w-full ">
      <div className="flex justify-center items-center w-full ">
        <CarouselContent className="-ml-2 md:-ml-4 flex justify-start items-center max-md:items-start">
          {categories.map((category) => (
            <Link href={`/products/${category.slug}`}>
              {' '}
              <CarouselItem
                key={category.id}
                className="pl-2 md:pl-4 basis-1/1 md:basis-1/4 lg:basis-1/6"
                // className="pl-1 md:basis-1/5 basis-1/6"
              >
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="rounded-full w-36 h-36 flex items-center justify-center border-4 border-gray-800  overflow-hidden">
                    <div className="flex items-center justify-center">
                      <Image
                        src={category.imageString || placeHolder}
                        width={1000}
                        height={1000}
                        alt={category.name}
                        className="object-fill w-full h-full"
                      />
                    </div>
                  </div>
                  <span className="text-lg font-semibold mt-2 text-center">
                    {category.name}
                  </span>
                </div>
              </CarouselItem>
            </Link>
          ))}
        </CarouselContent>
      </div>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Handpicked;

{
  /* <Carousel className="align-middle w-full">
<div className="-ml-1 flex justify-center items-center w-full ">
  <CarouselContent className="-ml-1 flex justify-center items-center w-full">
    {Array.from({ length: 20 }).map((_, index) => (
      <CarouselItem
        key={index}
        className="pl-1 md:basis-1/5 lg:basis-1/12"
      >
        <div className="p-1">
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <span className="text-2xl font-semibold">{index + 1}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
</div>
<CarouselPrevious />
<CarouselNext />
</Carousel> */
}
