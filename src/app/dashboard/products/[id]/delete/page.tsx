import { deleteProduct } from '@/app/actions';
import SubmitButton from '@/app/components/dashboard/SubmitButton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';

export default function DeleteRoute({ params }: { params: { id: string } }) {
  return (
    <div className="h-[80vh] flex justify-center items-center w-full">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you absolutely sure ?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete this
            product and all its data.
          </CardDescription>
          <CardFooter className="justify-end flex gap-3 items-center">
            <Button variant="outline" className="">
              Cancel
            </Button>
            <form action={deleteProduct}>
              <input type="hidden" name="productId" value={params.id} />
              <SubmitButton text={'Delete'} variant="destructive" />
            </form>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  );
}
