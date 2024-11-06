import { delItem } from '@/app/actions';
import { Cart } from '@/lib/interfaces';
import { redis } from '@/lib/redis';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { DeleteItemButton } from '../dashboard/SubmitButton';

export default async function DrawerCart() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect('/api/auth/login');
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  let cartSubtotal = 0;

  let cartTotal = 0;

  cart?.items.forEach((item) => {
    cartSubtotal += item.price * item.quantity; // Multiply price by quantity
    cartTotal += item.salePrice * item.quantity; // Multiply salePrice by quantity
  });

  let saveAmount = cartSubtotal - cartTotal;

  return (
    <>
      <div className="flex flex-col justify-between">
        {' '}
        <div>
          <span>
            Congratulations! You&#39;ll save ₹
            <strong className="font-medium text-green-500">
              {' '}
              {saveAmount}{' '}
            </strong>{' '}
            on this purchase.
          </span>
          <div className="flex flex-col justify-start">
            {cart?.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between my-5 border-b p-3"
              >
                <Image
                  src={item.imageString}
                  alt="Cart Product"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="rounded-lg object-cover w-full max-w-[100px]  h-auto"
                />
                <div className="flex ml-5 flex-col justify-start items-start space-y-1">
                  <h2>{item.name}</h2>
                  <h2>Quantity : {item.quantity}</h2>
                  <h2>
                    Price:{item.salePrice}
                    <del className="text-gray-500 ml-2">{item.price}</del>
                  </h2>
                </div>
                <form action={delItem}>
                  <input type="hidden" name="productId" value={item.id} />
                  <DeleteItemButton />
                </form>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 my-5">
          <div className="flex items-center justify-between space-y-1 ">
            <p>SubTotal</p>
            <p className="font-medium">
              {new Intl.NumberFormat('en-IN').format(cartSubtotal)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>Total</p>
            <p className="font-medium">
              {new Intl.NumberFormat('en-IN').format(cartTotal)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
