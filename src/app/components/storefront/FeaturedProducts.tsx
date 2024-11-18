import prisma from '@/lib/db';
import { LoadingProductCard, ProductCard } from './ProductCard';
import { Suspense } from 'react';
import { Separator } from '@/components/ui/separator';

async function getFeaturedProducts() {
  const data = await prisma.product.findMany({
    where: {
      status: 'published',
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      shortDescription: true,
      images: true,
      price: true,
      salePrice: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });
  return data;
}

export default function FeaturedProducts() {
  return (
    <>
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl text-center tracking-wide my-10 "></h2>
      <h2 className="text-3xl capitalize font-bold text-gray-900 sm:text-3xl text-center tracking-wide mt-10 mb-4">
        Featured Products
      </h2>
      <Separator className="w-[50%] bg-black mx-auto mb-10" />
      <Suspense fallback={loadingRows()}>
        <LoadingFeaturedProducts />
      </Suspense>
    </>
  );
}

async function LoadingFeaturedProducts() {
  const data = await getFeaturedProducts();

  return (
    <div className="mt-5 grid grid-cols-2 lg:grid-cols-5 gap-10">
      {data.map((item) => (
        <ProductCard item={item} key={item.id} />
      ))}
    </div>
  );
}

function loadingRows() {
  return (
    <div className="mt-5 grid sm:grid-cols-1 lg:grid-cols-5 gap-5">
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  );
}
