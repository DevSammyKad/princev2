import { ProductCard } from '@/app/components/storefront/ProductCard';
import prisma from '@/lib/db';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Helper function to get all subcategories of a top-level category
async function getSubcategories(categoryId: string) {
  const subcategories = await prisma.category.findMany({
    where: {
      parentId: categoryId,
    },
    select: {
      id: true,
    },
  });

  return subcategories.map((sub) => sub.id);
}

async function getData(productCategorySlug: string) {
  // Find the category by its slug
  const category = await prisma.category.findUnique({
    where: {
      slug: productCategorySlug,
    },
    select: {
      id: true,
      name: true,
      parentId: true, // Check if it's a subcategory
    },
  });

  // If the category doesn't exist, return an empty response
  if (!category) {
    const allProducts = await prisma.product.findMany();
    return {
      title: 'Unknown Category So Showing All Products ',
      data: allProducts,
    };
  }

  let categoryIds = [category.id];

  // If it's a top-level category, fetch all related subcategories
  if (!category.parentId) {
    const subcategoryIds = await getSubcategories(category.id);
    categoryIds = categoryIds.concat(subcategoryIds);
  }

  // Fetch products based on category and subcategory IDs
  const data = await prisma.product.findMany({
    select: {
      name: true,
      images: true,
      shortDescription: true,
      description: true,
      id: true,
      price: true,
      salePrice: true,
      category: true,
    },
    where: {
      categoryId: {
        in: categoryIds,
      },
      status: 'published',
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    title: category.name,
    data: data,
  };
}

export default async function CategoriesPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data, title } = await getData(params.slug);

  return (
    <section className="mx-auto">
      <div className="my-5">
        <ol className="flex items-center whitespace-nowrap">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
              href="/"
            >
              Home
            </Link>
            <ChevronRight className="text-gray-400 h-4 w-4 mx-3" />
          </li>
          <li
            className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200"
            aria-current="page"
          >
            {title}
          </li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ">
        {data.map((item, index) => (
          <ProductCard item={item} key={item.id || `product-${index}`} />
        ))}
      </div>
    </section>
  );
}
