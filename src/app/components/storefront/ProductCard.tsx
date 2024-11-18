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
    // <Link href={`/product/${item.id}`}>
    <div className="group relative rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden">
      <Carousel className="w-full mx-auto aspect-square ">
        <CarouselContent>
          {item.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-square w-full overflow-hidden ">
                <Image
                  src={image}
                  alt={`${item.name} - Image ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  // width={0}
                  // height={0}
                  sizes="100vh"
                  className="transition-transform duration-300 w-[400px] object-contain  object-center group-hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
      </Carousel>
      <div className="p-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {item.name}
        </h2>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 ">
          {item.shortDescription}
        </p>
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <span className="text-2xl font-bold text-primary">
              ₹{item.salePrice}
            </span>
            <del className="block text-sm text-gray-400">₹{item.price}</del>
          </div>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
            {Math.round((1 - item.salePrice / item.price) * 100)}% OFF
          </span>
        </div>
        <Link href={`/product/${item.id}`} passHref>
          <Button className="w-full transition-colors duration-300 hover:bg-primary-dark">
            View Product
          </Button>
        </Link>
      </div>
    </div>
    // </Link>
  );
}

{
  /* <div className="group relative rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden">
<Carousel className="w-full mx-auto aspect-square ">
  <CarouselContent>
    {item.images.map((image, index) => (
      <CarouselItem key={index}>
        <div className="relative aspect-square w-full overflow-hidden ">
          <Image
            src={image}
            alt={`${item.name} - Image ${index + 1}`}
            fill
            style={{ objectFit: 'cover' }}
            // width={0}
            // height={0}
            sizes="100vh"
            className="transition-transform duration-300 w-[400px] object-contain  object-center group-hover:scale-105"
          />
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
</Carousel>
<div className="p-3">
  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
    {item.name}
  </h2>
  <p className="text-sm text-gray-600 mb-4 line-clamp-2 ">
    {item.shortDescription}
  </p>
  <div className="flex justify-between items-center mb-4">
    <div className="space-y-1">
      <span className="text-2xl font-bold text-primary">
        ₹{item.salePrice}
      </span>
      <del className="block text-sm text-gray-400">₹{item.price}</del>
    </div>
    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
      {Math.round((1 - item.salePrice / item.price) * 100)}% OFF
    </span>
  </div>
  <Link href={`/product/${item.id}`} passHref>
    <Button className="w-full transition-colors duration-300 hover:bg-primary-dark">
      View Product
    </Button>
  </Link>
</div>
</div> */
}
export function LoadingProductCard() {
  return (
    <div className="group relative rounded-xl shadow-lg animate-pulse overflow-hidden">
      <div className="w-full h-60 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-4 mt-2 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 mt-2 bg-gray-200 rounded"></div>
        <div className="h-4 mt-2 bg-gray-200 rounded w-1/2"></div>
        <div className="flex justify-between items-center mt-2">
          <div className="space-y-1">
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/4"></div>
          </div>
          <div className="px-2 py-1 bg-gray-200 rounded-full w-16"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded mt-2"></div>
      </div>
    </div>
  );
}

{
  /* <div className="rounded-xl bg-white shadow-lg overflow-hidden">
      <Skeleton className="w-full aspect-square" />
      <div className="p-4 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-6 w-1/4 rounded-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div> */
}
