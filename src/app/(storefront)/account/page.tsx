import { Cart } from '@/lib/interfaces';
import { redis } from '@/lib/redis';
import {
  getKindeServerSession,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import placeHolderImage from '../../../../public/placeholder.jpg';
import { Check } from 'lucide-react';
import prisma from '@/lib/db';

import EditAccountForm from '@/app/components/storefront/EditAccountForm';
import Link from 'next/link';

interface iAppProps {
  data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    phoneNumber: string | null;
    address: string | null;
    pincode: number | null;
    city: string | null;
    state: string | null;
    country: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}

interface ProductDetail {
  productIds: string;
  quantity: number;
}

interface OrderProduct {
  id: string;
  name: string;
  salePrice: number;
  shortDescription?: string;
  images: string[];
  quantity: number; // add quantity for displaying in the UI
}
interface Order {
  id: string;
  status: string;
  amount: number;
  productDetails: ProductDetail[];
  products: OrderProduct[];
  createdAt: Date;
}

async function getOrdersById() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect('/api/auth/login');
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      id: 'desc',
    },
  });
  const enrichedOrders = await Promise.all(
    orders.map(async (order) => {
      const productDetails: ProductDetail[] =
        typeof order.productDetails === 'string'
          ? JSON.parse(order.productDetails)
          : order.productDetails || [];

      const productIds = productDetails.map((detail) => detail.productIds);

      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      return { ...order, products, productDetails };
    })
  );

  return enrichedOrders;
}

async function getDbUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect('/api/auth/login');
  }
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      orders: true,
      _count: { select: { orders: true } },
    },
  });
  return dbUser;
}

async function getUserData() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect('/api/auth/login');
  }

  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  return userData;
}

export default async function account({ data }: iAppProps) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect('/api/auth/login');
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  const dbUser = await getDbUser();
  const orders = await getOrdersById();
  const userData = await getUserData();

  return (
    <div className="min-h-screen w-full ">
      <div className="max-w-7xl mx-auto p-6 max-md:p-2">
        {/* <h1 className="text-3xl font-semibold my-5">Settings</h1> */}
        <Tabs defaultValue="account" className="flex flex-col gap-5 w-full ">
          <TabsList className="flex  max-md:flex-row items-start max-md:items-center justify-start gap-3 text-gray-800  px-4">
            <TabsTrigger
              value="account"
              className="aria-selected:text-blue-500 "
            >
              Account
            </TabsTrigger>

            <TabsTrigger
              value="orders"
              className="aria-selected:text-blue-500 "
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="support"
              className="aria-selected:text-blue-500 "
            >
              Support
            </TabsTrigger>
            <TabsTrigger value="refer" className="aria-selected:text-blue-500 ">
              Refer And Earn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="w-full">
            <EditAccountForm data={userData} />
          </TabsContent>

          <TabsContent value="orders" className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>Order history {dbUser?._count?.orders}</CardTitle>
                <CardDescription>
                  Check the status of recent orders, manage orders
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            {orders.map((order) => (
              <Card className="my-4">
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <h1>Order ID : {order.id}</h1>
                  </CardTitle>
                  <CardDescription className="mt-3 py-5 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5 max-md:hidden">
                        <div className="flex flex-col gap-2">
                          <h1 className="text-lg font-medium text-gray-600">
                            Order Number
                          </h1>
                          <span>{order.id}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <h1 className="text-lg font-medium text-gray-600">
                            Order Date
                          </h1>
                          <span>
                            {new Intl.DateTimeFormat('en-IN').format(
                              order.createdAt
                            )}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <h1 className="text-lg font-medium text-gray-600">
                            Total Amount
                          </h1>
                          <span>
                            ₹
                            {new Intl.NumberFormat('en-IN').format(
                              order.amount / 100
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-5">
                        {/* <Button variant="outline"> View Order</Button> */}
                        <Button variant="outline"> View Invoice</Button>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {order.productDetails.map((detail: ProductDetail) => {
                    const product = order.products.find(
                      (p) => p.id === detail.productIds
                    );
                    return (
                      <div
                        className="flex items-start gap-5 my-5"
                        key={detail.productIds}
                      >
                        <div>
                          <Image
                            src={product?.images[0] || placeHolderImage}
                            width={150}
                            height={150}
                            alt="Order Image"
                            className="object-cover aspect-square rounded-lg"
                          />
                        </div>
                        <div className="w-full flex flex-col">
                          <div className="flex justify-between ">
                            <h1 className="text-lg font-medium text-black max-sm:text-sm">
                              {product ? product.name : 'Product Not Found'}
                            </h1>
                            <span className="text-blue-500 bg-blue-50 py-2 px-4 rounded-lg font-medium text-lg max-sm:text-sm">
                              ₹
                              {product
                                ? new Intl.NumberFormat('en-IN').format(
                                    product.salePrice
                                  )
                                : 'N/A'}
                            </span>
                          </div>
                          <div className="max-sm:hidden">
                            <p className="text-gray-500 text-sm">
                              {product
                                ? product.shortDescription
                                : 'Description Not Available'}
                            </p>
                            <div className="my-2 flex justify-between items-center">
                              <p className="text-black ">
                                Quantity: {detail.quantity}
                              </p>
                              {/* <Link href={`/product/${detail.productIds}`}>
                                <Button variant="secondary">
                                  {' '}
                                  View Product
                                </Button>
                              </Link> */}
                            </div>
                            {/* Display quantity here */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>

                <CardFooter>
                  <div className="flex items-center justify-between w-full max-sm:flex-col max-sm:gap-3">
                    <div className="flex items-center gap-3">
                      <Check className="rounded-full bg-green-500 text-white p-1" />
                      <span>
                        Ordered on{' '}
                        {new Intl.DateTimeFormat('en-IN').format(
                          order.createdAt
                        )}{' '}
                      </span>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="text-green-500 bg-green-50 py-2 px-4 rounded-lg font-medium text-lg max-sm:text-sm">
                        ₹
                        {order.amount
                          ? new Intl.NumberFormat('en-IN').format(
                              order.amount / 100
                            )
                          : 'N/A'}
                      </span>
                      {/* <Button variant="secondary"> View Product</Button> */}
                      {/* <Button> Buy Again</Button> */}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="support" className="w-full">
            Change your address here.
            <LogoutLink>Logout</LogoutLink>
          </TabsContent>
          <TabsContent value="refer" className="w-full">
            This Feature is under construction
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
