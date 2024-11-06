import { deleteCategory } from '@/app/actions';
import SubmitButton from '@/app/components/dashboard/SubmitButton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import Link from 'next/link';

export default function CategoryDeleteRoute({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="h-[80vh] flex justify-center items-center w-full">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you absolutely sure ?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete this
            <strong className="text-red-500"> Category</strong> and all its
            data. Includes{' '}
            <strong className="text-red-500"> SubCategory and Products</strong>
          </CardDescription>
          <CardFooter className="justify-end flex gap-3 items-center">
            <Link href="/dashboard/categories">
              <Button variant="outline" type="button" className="">
                Cancel
              </Button>
            </Link>
            <form action={deleteCategory}>
              <input type="hidden" name="categoryId" value={params.id} />
              <SubmitButton text={'Delete Category'} variant="destructive" />
            </form>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  );
}
