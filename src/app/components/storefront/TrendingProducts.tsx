import prisma from '@/lib/db';
import { ProductCard } from './ProductCard';

async function getTrendingProducts() {
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
    skip: 5,
    take: 5,
  });
  return data;
}

export default async function TrendingProducts() {
  const data = await getTrendingProducts();
  return (
    <>
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl text-center tracking-wide my-10 ">
        Trending Products
      </h2>
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {data.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </>
  );
}
