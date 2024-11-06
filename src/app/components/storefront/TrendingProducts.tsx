import prisma from '@/lib/db';
import { LoadingProductCard, ProductCard } from './ProductCard';
import { Suspense } from 'react';
import { Separator } from '@/components/ui/separator';

async function getTrendingProducts() {
  const data = await prisma.product.findMany({
    where: {
      status: 'published',
      tags: {
        has: 'Trending',
      },
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
      createdAt: 'asc',
    },
    skip: 0,
    take: 5,
  });
  return data;
}

export default function TrendingProducts() {
  return (
    <>
      <h2 className="text-3xl capitalize font-bold text-gray-900 sm:text-3xl text-center tracking-wide mt-10 mb-4">
        Trending Special
      </h2>
      <Separator className="w-[50%] bg-black mx-auto mb-10" />

      <Suspense fallback={loadingRows()}>
        <LoadingTrendingProducts />
      </Suspense>
    </>
  );
}

async function LoadingTrendingProducts() {
  const data = await getTrendingProducts();

  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
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
