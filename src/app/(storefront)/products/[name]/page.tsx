import { ProductCard } from '@/app/components/storefront/ProductCard';
import prisma from '@/lib/db';

async function getData(productCategory: string) {
  switch (productCategory) {
    case 'all': {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          shortDescription: true,
          description: true,
          id: true,
          price: true,
          salePrice: true,
        },
        where: {
          status: 'published',
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return {
        title: 'All Product',
        data: data,
      };
    }
    case 'men': {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          shortDescription: true,
          description: true,
          id: true,
          price: true,
          salePrice: true,
        },
        where: {
          category: {
            slug: 'men',
          },
          status: 'published',
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { title: 'Products for Men', data };
    }
    default:
      return {
        title: 'Unknown Category',
        data: [],
      };
  }
}

export default async function CategoriesPage({
  params,
}: {
  params: { name: string };
}) {
  const { data, title } = await getData(params.name);
  return (
    <section className="mx-auto">
      <h1>{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ">
        {data.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
