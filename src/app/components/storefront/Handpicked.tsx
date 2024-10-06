import Image from 'next/image';
import catOne from '../../../../public/3.png';
import {
  Carousel,
  CarouselItem,
  CarouselContent,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import prisma from '@/lib/db';

async function fetchCategories() {
  const categories = prisma.category.findMany();
  return categories;
}

const Handpicked = async () => {
  const categories = await fetchCategories();
  return (
    <Carousel>
      <CarouselContent>
        {categories.map((category) => (
          <CarouselItem
            key={category.id}
            className="pl-1 basis-1/3 lg:basis-1/6"
          >
            <div className="p-1 flex flex-col items-center  text-center">
              {/* <Card className="">
         <CardContent className="flex aspect-square items-center justify-center flex-col"> */}
              <Image
                src={category.imageString ?? ''}
                width={1000}
                height={1000}
                alt="Handpicked Category"
                className="rounded-full object-center object-cover w-32 h-32"
              />

              <span className="text-2xl font-semibold text-center">
                {category.name}
              </span>
              {/* </CardContent>
       </Card> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Handpicked;
