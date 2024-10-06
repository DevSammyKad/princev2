import EditCategory from '@/app/components/dashboard/EditCategory';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

async function getData(categoryId: string) {
  const data = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  return data;
}

export default async function EditCategoryRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  if (!data) {
    return notFound();
  }
  return <EditCategory data={data} />;
}
