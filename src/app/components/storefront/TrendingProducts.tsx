import prisma from '@/lib/db';
import { ProductCard } from './ProductCard';

async function getTrendingProducts() {
  const data = await prisma.product.findMany({
    where: {
      productTags: {
        some: {
          name: 'Trending-Products', // Ensure this tag exists in the Tags table
        },
      },
      status: 'published',
    },
    select: {
      id: true,
      name: true,
      shortDescription: true,
      images: true,
      price: true,
      salePrice: true,
      productTags: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: 0, // Use 0 if you want to fetch the latest trending products without skipping any
    take: 5,
  });
  return data;
}

export default async function TrendingProducts() {
  const data = await getTrendingProducts();
  return (
    <>
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl text-center tracking-wide my-10">
        Trending Products
      </h2>
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {data.length > 0 ? (
          data.map((item) => <ProductCard item={item} key={item.id} />)
        ) : (
          <p className="text-center text-gray-500">
            No trending products available.
          </p>
        )}
      </div>
    </>
  );
}
