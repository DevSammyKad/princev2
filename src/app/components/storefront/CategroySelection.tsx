import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import fanCategory from '../../../../public/fanCategory.png';
import newCollection from '../../../../public/newCollection.png';
import viralCategory from '../../../../public/viralCategory.png';

export function CategoriesSelection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="flex items-center justify-between">
        <h2 className="tracking-tight text-2xl font-extrabold">
          Shop by Category{' '}
        </h2>
        <Link
          className="text-sm text-blue-500 flex gap-2 items-center"
          href="/products/all"
        >
          All Products
          <ChevronRight />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:gap-8 ">
        <div className="grid max-sm:grid-cols-2 gap-5">
          <Link
            href="/products/all"
            className="hover:border-blue-300 border-2 rounded-lg p-0.5"
          >
            <Image
              src={viralCategory}
              width="0"
              height="0"
              sizes="100vw"
              alt="Product Image"
              className="object-cover object-center rounded-lg max-sm:h-[100px]"
            />
          </Link>
          <Image
            src={newCollection}
            alt="New Collection Image"
            width="0"
            height="0"
            sizes="100vw"
            className="object-cover object-center rounded-lg  max-sm:h-[100px]"
          />
        </div>
        <div className="group aspect-w-2 aspect-h-1 border">
          <Image
            src={fanCategory}
            alt="Fan Category Image"
            width="0"
            height="0"
            sizes="100vw"
            className="object-cover object-center rounded-lg max-sm:h-[200px]"
          />
        </div>
      </div>
    </div>
  );
}
