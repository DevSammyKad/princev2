import { Button } from '@/components/ui/button';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Cart } from '@/lib/interfaces';
import { redis } from '@/lib/redis';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import DrawerCart from './DrawerCart';
import { CheckOutButton } from '../dashboard/SubmitButton';
import { ShoppingBag } from 'lucide-react';
import emptyStateCart from '../../../../public/emptyStateCart.svg';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/db';

export async function CartSheet() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log('User ID:', user?.id);

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);

  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0 || 0);

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary" className="relative gap-2">
            <ShoppingBag />
            Cart
            {total !== undefined && total > 0 && (
              <>
                <span className="w-2 h-2 top-1 rounded-full animate-pulse right-2 absolute bg-blue-400" />
                <span>{`(${total})`}</span>
              </>
            )}
          </Button>
        </SheetTrigger>
        {cart?.items.length === 0 ? (
          <SheetContent className="flex flex-col h-full">
            <SheetHeader className="">
              <SheetTitle>Shopping Cart</SheetTitle>
            </SheetHeader>
            <div className="flex justify-center flex-col items-center">
              <Image
                src={emptyStateCart}
                width={300}
                height={300}
                alt="cart-0"
              />
              <SheetFooter className="">
                <SheetClose>
                  <div className="flex justify-center flex-col items-center space-y-5 ">
                    <Button variant="outline">0 Item found</Button>

                    <Button>Continue Shopping</Button>
                  </div>
                </SheetClose>
              </SheetFooter>
            </div>
          </SheetContent>
        ) : (
          <SheetContent className="flex flex-col h-full">
            <SheetHeader className="flex-shrink-0">
              <SheetTitle>Shopping Cart</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto">
              <DrawerCart />
            </div>
            <SheetFooter className="flex-shrink-0">
              <SheetClose asChild>
                <div className="flex justify-between items-center space-x-5 w-full">
                  <Button variant="outline">Continue Shopping</Button>

                  {dbUser?.address === null ? (
                    <div>
                      <Link href={'/account'}>
                        <Button>First Fill Address</Button>
                      </Link>
                    </div>
                  ) : (
                    <CheckOutButton />
                  )}
                </div>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        )}
      </Sheet>
    </>
  );
}
