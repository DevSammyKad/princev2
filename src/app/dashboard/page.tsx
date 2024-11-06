import Link from 'next/link';

import {
  Activity,
  ArrowUpRight,
  CreditCard,
  IndianRupee,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import prisma from '@/lib/db';
import { cn } from '@/lib/utils';

async function getActiveProductCount() {
  const count = await prisma.product.count({
    where: {
      //   status: ProductStatus.published,
    },
  });
  return count;
}

async function getRevenueCount() {
  const totalRevenue = await prisma.order.aggregate({
    where: {
      status: 'paid',
    },
    _sum: {
      amount: true,
    },
  });

  return totalRevenue._sum.amount || 0;
}

async function getActiveUsersCount() {
  const count = await prisma.user.count({
    where: {
      //   status: ProductStatus.published,
    },
  });
  return count;
}

async function getTotalOrders() {
  const count = await prisma.order.count();
  return count;
}

const fetchRazorpayOrder = async () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const encodedCredentials = Buffer.from(`${keyId}:${keySecret}`).toString(
    'base64'
  );

  const URL = ' https://api.razorpay.com/v1/orders?count=5';
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      authorization: `Basic${encodedCredentials}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch order: ${response.statusText}`);
  }

  const razorpayOrders = await response.json();
  return razorpayOrders;
};

interface RazorpayOrderiApps {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  offer_id: string | null;
  status: string;
  attempts: number;
  notes: Record<string, any>; // Adjust based on the actual structure of `notes`
  created_at: number;
}

export default async function Dashboard() {
  const count = getActiveProductCount();
  const activeUsers = getActiveUsersCount();
  const totalOrders = getTotalOrders();
  const totalRevenue = await getRevenueCount();

  const RazorpayOrderData = await fetchRazorpayOrder();

  const orderItems = RazorpayOrderData.items;

  console.log('orders: ', RazorpayOrderData);

  const formattedRevenue = (totalRevenue / 100).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  const orders = await prisma.order.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('en-IN').format(totalRevenue / 100) ||
                  '0'}
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>

              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Products
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count}</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="">PhoneNumber</TableHead>
                    <TableHead className="">Status</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="font-medium">
                          {order.user?.firstName} {order.user?.lastName}
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {order.user?.email}
                        </div>
                      </TableCell>
                      <TableCell className="">
                        {order.user?.phoneNumber}
                      </TableCell>
                      <TableCell className="">
                        <Badge
                          className={cn(
                            'text-xs',
                            order.status === 'paid'
                              ? 'bg-green-100 text-green-500'
                              : order.status === 'unpaid'
                              ? ' bg-red-100 text-red-500'
                              : 'bg-gray-100 text-gray-500'
                          )}
                          variant="outline"
                        >
                          {order.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        {new Intl.DateTimeFormat('en-IN').format(
                          order.createdAt
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {/* <IndianRupee className="h-4 w-4 text-muted-foreground" /> */}

                        {new Intl.NumberFormat('en-IN').format(
                          order.amount / 100
                        ) || '0'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div>
                {orderItems.map((order: RazorpayOrderiApps) => (
                  <div key={order.id} className="flex items-center gap-4 py-2">
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Receipt: {order.receipt || 'N/A'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Status: {order.status}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      {`₹${(order.amount / 100).toLocaleString()}`}{' '}
                      {/* Assuming amount is in paise */}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
