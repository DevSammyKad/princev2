// components/GlobalSearchData.js

import prisma from '@/lib/db';
import { Product, Category } from '@prisma/client';

interface ProductWithCategory extends Product {
  category: Category | null;
}

const fetchProductData = async (): Promise<ProductWithCategory[]> => {
  return await prisma.product.findMany({
    where: { status: 'published' },
    include: { category: true },
  });
};

export default async function GlobalSearchData(): Promise<
  ProductWithCategory[]
> {
  const data = await fetchProductData();
  return data;
}
