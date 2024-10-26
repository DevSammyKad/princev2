import prisma from '@/lib/db';
import { LoadingProductCard, ProductCard } from './ProductCard';
import { Suspense } from 'react';

async function getBestSellersProducts() {
  const data = await prisma.product.findMany({
    where: {
      status: 'published',
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
    skip: 0,
    take: 5,
  });
  return data;
}

export default function BestSellersProducts() {
  return (
    <>
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl text-center tracking-wide my-10 ">
        Best Sellers
      </h2>
      <Suspense fallback={loadingRows()}>
        <LoadingBestSellersProducts />
      </Suspense>
    </>
  );
}

async function LoadingBestSellersProducts() {
  const data = await getBestSellersProducts();

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
