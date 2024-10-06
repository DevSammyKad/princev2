import { Cart } from '@/lib/interfaces';
import { redis } from '@/lib/redis';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import placeHolderImage from '../../../../public/placeholder.jpg';
import { Check, CheckCheck } from 'lucide-react';

export const description =
  'A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings.';

export default async function account() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect('/api/auth/login');
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  const kindeUserEmail = user.email as string;
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
              value="address"
              className="aria-selected:text-blue-500 "
            >
              Address
            </TabsTrigger>
            <TabsTrigger value="refer" className="aria-selected:text-blue-500 ">
              Refer And Earn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Use a permanent address where you can receive mail.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <Label htmlFor="first-name">First name</Label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="first-name"
                        id="first-name"
                        placeholder="First name"
                        value={kindeUserEmail}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <Label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </Label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="last-name"
                        id="last-name"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <Label htmlFor="email">Email address</Label>
                    <div className="mt-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email address"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <Label htmlFor="country">Country</Label>
                    <div className="mt-2">
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pakistan">Pakistan</SelectItem>
                          <SelectItem value="usa">USA</SelectItem>
                          <SelectItem value="india">India</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <Label htmlFor="street-address">Street address</Label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="street-address"
                        id="street-address"
                        placeholder="Street address"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <Label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </Label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="City"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <Label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State
                    </Label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="region"
                        id="region"
                        placeholder="State"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <Label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </Label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        placeholder="ZIP / Postal code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>Order history</CardTitle>
                <CardDescription>
                  Check the status of recent orders, manage returns, and
                  discover similar products.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Card className="my-4">
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <h1>Order ID :</h1> <span>#U#DJDKJSNN!88282</span>
                    </CardTitle>
                    <CardDescription className="mt-3 py-5 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5 max-md:hidden">
                          <div className="flex flex-col gap-2">
                            <h1 className="text-lg font-medium text-gray-600">
                              Order Number
                            </h1>
                            <span>WUUS121292</span>
                          </div>
                          <div className="flex flex-col gap-2">
                            <h1 className="text-lg font-medium text-gray-600">
                              Order Date
                            </h1>
                            <span>12-4-2002</span>
                          </div>
                          <div className="flex flex-col gap-2">
                            <h1 className="text-lg font-medium text-gray-600">
                              Total Amount
                            </h1>
                            <span>₹ 10000</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-5">
                          <Button variant="outline"> View Order</Button>
                          <Button variant="outline"> View Invoice</Button>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-5">
                      <div>
                        <Image
                          src={placeHolderImage}
                          width={150}
                          height={150}
                          alt="Order Image"
                          className="object-cover aspect-square rounded-lg"
                        />
                      </div>
                      <div className="w-full flex flex-col">
                        <div className="flex justify-between ">
                          <h1 className="text-lg font-medium text-gray-600 max-sm:text-sm">
                            Micro Backpack
                          </h1>
                          <span className="text-green-500 bg-green-50 py-2 px-4 rounded-lg font-medium text-lg max-sm:text-sm">
                            ₹ 2000
                          </span>
                        </div>
                        <div className="max-sm:hidden">
                          <p>
                            Are you a minimalist looking for a compact carry
                            option? The Micro Backpack is the perfect size for
                            your essential everyday carry items. Wear it like a
                            backpack or carry it like a satchel for all-day use.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center justify-between w-full max-sm:flex-col max-sm:gap-3">
                      <div className="flex items-center gap-3">
                        <Check className="rounded-full bg-green-500 text-white p-1" />
                        <span>Delivered on July 12, 2001 </span>
                      </div>
                      <div className="flex items-center gap-5">
                        <Button variant="secondary"> View Product</Button>
                        <Button> Buy Again</Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
                <Card className="my-4">
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <h1>Order ID :</h1> <span>#U#DJDKJSNN!88282</span>
                    </CardTitle>
                    <CardDescription className="mt-3 py-5 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5 max-md:hidden">
                          <div className="flex flex-col gap-2">
                            <h1 className="text-lg font-medium text-gray-600">
                              Order Number
                            </h1>
                            <span>WUUS121292</span>
                          </div>
                          <div className="flex flex-col gap-2">
                            <h1 className="text-lg font-medium text-gray-600">
                              Order Date
                            </h1>
                            <span>12-4-2002</span>
                          </div>
                          <div className="flex flex-col gap-2">
                            <h1 className="text-lg font-medium text-gray-600">
                              Total Amount
                            </h1>
                            <span>₹ 10000</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-5">
                          <Button variant="outline"> View Order</Button>
                          <Button variant="outline"> View Invoice</Button>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-5">
                      <div>
                        <Image
                          src={placeHolderImage}
                          width={150}
                          height={150}
                          alt="Order Image "
                          className=" object-cover aspect-square rounded-lg"
                        />
                      </div>
                      <div className="w-full flex flex-col">
                        <div className="flex justify-between ">
                          <h1 className="text-lg font-medium text-gray-600 max-sm:text-sm">
                            Micro Backpack
                          </h1>
                          <span className="text-green-500 bg-green-50 py-2 px-4 rounded-lg font-medium text-lg max-sm:text-sm">
                            ₹ 2000
                          </span>
                        </div>
                        <div className="max-sm:hidden">
                          <p>
                            Are you a minimalist looking for a compact carry
                            option? The Micro Backpack is the perfect size for
                            your essential everyday carry items. Wear it like a
                            backpack or carry it like a satchel for all-day use.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center justify-between w-full max-sm:flex-col max-sm:gap-3">
                      <div className="flex items-center gap-3">
                        <Check className="rounded-full bg-green-500 text-white p-1" />
                        <span>Delivered on July 12, 2001 </span>
                      </div>
                      <div className="flex items-center gap-5">
                        <Button variant="secondary"> View Product</Button>
                        <Button> Buy Again</Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="address" className="w-full">
            Change your address here.
          </TabsContent>
          <TabsContent value="refer" className="w-full">
            This Feature is under construction
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
