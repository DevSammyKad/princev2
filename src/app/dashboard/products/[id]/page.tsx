import EditForm from '@/app/components/dashboard/EditForm';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}
export default async function EditRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  if (!data) {
    return notFound();
  }

  const productData = {
    ...data,
    category: data.categoryId || '', // Map categoryId to category
  };

  return <EditForm data={productData} />;
}
