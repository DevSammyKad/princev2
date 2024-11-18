import { ShoppingBag, User2Icon } from 'lucide-react';
import brandLogo from '../../../../public/Bajaj-Logo.png';

import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Cart } from '@/lib/interfaces';
import { redis } from '@/lib/redis';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import DrawerCart from './DrawerCart';

import { CheckOutButton } from '../dashboard/SubmitButton';
import { CartSheet } from './CartSheet';
import GlobalSearch from './GlobalSearch';
import GlobalSearchData from '@/lib/GlobalSearchData';

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await GlobalSearchData();
  const cart: Cart | null = await redis.get(`cart-${user?.id}`);

  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0 || 0);

  return (
    <>
      <header className="bg-white my-5">
        <nav className=" mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={brandLogo}
                alt="Brand Logo"
                width={150}
                height={100}
                className="w-24 h-18"
              />
            </Link>
          </div>
          <div className="hidden md:block max-w-full mx-4">
            <GlobalSearch data={data} />
          </div>

          <div className="block ">
            {user ? (
              <div className="space-x-2 flex items-center ">
                {' '}
                <div className="max-sm:hidden">
                  <CartSheet />
                </div>
                <div className="sm:hidden">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="secondary" className="relative gap-1">
                        <ShoppingBag />
                        <p className="max-sm:hidden">Cart</p>
                        {total !== undefined && total > 0 && (
                          <span className="w-2 h-2 top-1 rounded-full animate-pulse right-2 absolute bg-blue-400" />
                        )}
                        <span>{total}</span>
                      </Button>
                    </DrawerTrigger>

                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Shopping Cart</DrawerTitle>
                        <DrawerCart />
                      </DrawerHeader>
                      <DrawerFooter>
                        <DrawerClose>
                          <div className="flex justify-between items-center ">
                            <Button variant="outline">Continue Shopping</Button>

                            <CheckOutButton />
                          </div>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
                <Link href="/account" className="flex items-center gap-2">
                  <Button variant="ghost">
                    {' '}
                    <User2Icon />
                    <p className="hidden sm:block">Account</p>
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="ml-4 space-x-4 flex items-center md:ml-6">
                <Button variant="secondary">
                  <RegisterLink>Register</RegisterLink>
                </Button>
                <Button variant="ghost">
                  <LoginLink>Login</LoginLink>
                </Button>
              </div>
            )}
          </div>
        </nav>
        <div className="my-5 flex-1 max-w-full md:hidden mx-8">
          <GlobalSearch data={data} />
        </div>
      </header>
    </>
  );
}
