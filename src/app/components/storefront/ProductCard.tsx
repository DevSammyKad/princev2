import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';

interface iAppProps {
  item: {
    id: string;
    name: string;
    shortDescription: string;
    images: string[];
    price: number;
    salePrice: number;
  };
}

export function ProductCard({ item }: iAppProps) {
  return (
    <div className="rounded-lg bg-slate-50 shadow-md flex flex-col justify-between h-full">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {item.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[330px] w-full rounded-lg overflow-hidden ">
                <Image
                  src={item}
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt="Product Image"
                  className="w-full h-[330px] object-contain object-center bg-white p-1"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-14" />
        <CarouselNext className="mr-14" />
      </Carousel>
      <div className="flex justify-between items-center mt-2 w-full ">
        <h1 className="font-semibold text-xl ">{item.name}</h1>
        <div className="flex justify-center items-center space-x-2 w-auto">
          <h3 className="inline-flex items-center rounded-md bg-blue/10 px-2 py-1 text-sm font-medium text-blue-500 ring-1 ring-inset ring-blue-500/10">
            ₹ {item.salePrice}
          </h3>

          <del className="inline-flex text-gray-400 items-center rounded-md bg-blue/10 px-2 py-1 text-sm font-medium  ring-1 ring-inset ring-blue-500/10">
            {item.price}
          </del>
        </div>
      </div>
      <div>
        <p className="text-gray-500 text-sm line-clamp-2">
          {item.shortDescription}
        </p>
        <Button className="w-full mt-5">
          <Link href={`/product/${item.id}`}>View Product</Link>
        </Button>
      </div>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[300px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}
