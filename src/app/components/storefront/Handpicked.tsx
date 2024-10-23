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

async function fetchCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

const Handpicked = async () => {
  const categories = await fetchCategories();

  return (
    <Carousel
      opts={{
        align: 'start', // Align items to the start
        loop: true, // Disable looping
      }}
      className="w-full max-w-7xl mx-auto overflow-x-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        <div className="flex justify-center items-center w-full">
          {categories.map((category) => (
            <Link href={`/products/${category.slug}`}>
              {' '}
              <CarouselItem
                key={category.id}
                className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <div className="p-4 flex flex-col items-center text-center">
                  <Image
                    src={category.imageString || placeHolder}
                    width={100}
                    height={100}
                    alt={category.name}
                    className="rounded-full object-center object-cover w-32 h-32"
                  />
                  <span className="text-lg font-semibold mt-2">
                    {category.name}
                  </span>
                </div>
              </CarouselItem>
            </Link>
          ))}
        </div>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Handpicked;
