import prisma from '@/lib/db';
import HeroCarousel from './HeroCarousel';

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return data;
}

export default async function Hero() {
  const data = await getData();
  return <HeroCarousel data={data} />;
}
