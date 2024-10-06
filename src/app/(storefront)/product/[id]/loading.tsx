import { Skeleton } from '@/components/ui/skeleton';

export default function ProductLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start lg:m-10">
      <div>
        <Skeleton className="h-[500px] w-full my-10" />
        <div className="mt-10 grid grid-cols-5 min-w-[100px] gap-5">
          <Skeleton className="w-full h-[100px]" />
          <Skeleton className="w-full h-[100px]" />
          <Skeleton className="w-full h-[100px]" />
          <Skeleton className="w-full h-[100px]" />
          <Skeleton className="w-full h-[100px]" />
        </div>
      </div>
    </div>
  );
}
