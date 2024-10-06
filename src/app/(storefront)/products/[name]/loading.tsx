import { LoadingProductCard } from '@/app/components/storefront/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingFiles() {
  return (
    <div className="">
      <Skeleton className="w-72 h-10 my-5 rounded-lg animate-pulse" />
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}
