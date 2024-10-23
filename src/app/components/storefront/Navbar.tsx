import { Search, ShoppingBag, User2Icon } from 'lucide-react';
import brandLogo from '../../../../public/Bajaj-Logo.png';

import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { NavLinks } from './NavLinks';
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

import { Input } from '@/components/ui/input';
import { CheckOutButton } from '../dashboard/SubmitButton';
import { CartSheet } from './CartSheet';

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);

  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0 || 0);

  return (
    <>
      <header className="bg-white my-5 ">
        <nav className=" mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
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
            {/* <NavLinks /> */}
          </div>
          <div className="ml-2">
            <form className="ml-auto flex-1 sm:flex-initial items-center">
              <div className="relative items-center">
                <Search className="absolute left-2.5 top-[50%] -translate-y-[50%] h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 max-sm:w-[200px] sm:w-[300px] md:w-[200px] lg:w-[500px] "
                />
              </div>
            </form>
          </div>

          <div className="md:block">
            {user ? (
              <div className="ml-4 space-x-2 flex items-center md:ml-6">
                {' '}
                <div className="max-sm:hidden">
                  <CartSheet />
                </div>
                <div className="sm:hidden">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="secondary" className="relative">
                        <ShoppingBag />
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
                <Link href="/account">
                  <Button variant="ghost" size="icon">
                    <User2Icon />
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
      </header>
    </>
  );
}
