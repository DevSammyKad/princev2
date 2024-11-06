// Imports
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationEllipsis,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import prisma from '@/lib/db';
import React from 'react';
import { Order, User } from '@prisma/client';

// Define a type for the data returned by getOrders
interface OrdersData {
  orders: (Order & { user: User | null })[];
  totalOrders: number;
}

// Fetch orders with pagination
async function getOrders(
  page: number = 1,
  pageSize: number = 10
): Promise<OrdersData> {
  const skip = (page - 1) * pageSize;

  try {
    const [orders, totalOrders] = await Promise.all([
      prisma.order.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: { user: true },
      }),
      prisma.order.count(),
    ]);

    return { orders, totalOrders };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { orders: [], totalOrders: 0 };
  }
}

// Define props for OrdersPage component to handle Next.js server-side query params
interface OrdersPageProps {
  searchParams: { page?: string };
}

// OrdersPage component
const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  // Parse and validate the page parameter
  const page = parseInt(searchParams.page || '1', 10);
  const pageSize = 10;

  const { orders, totalOrders } = await getOrders(page, pageSize);
  const totalPages = Math.ceil(totalOrders / pageSize);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Recent orders from your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>OrderId</TableHead>
                <TableHead>Customer Details</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Contact Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-medium">{order.id}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {order.userId}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {`${order.user?.firstName || ''} ${
                        order.user?.lastName || ''
                      }`}
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {order.user?.address || '-'} {order.user?.city || '-'}{' '}
                      {order.user?.state || '-'} {order.user?.pincode || '-'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <pre className="font-medium">
                      {JSON.stringify(order.productDetails, null, 2)}
                    </pre>
                  </TableCell>

                  <TableCell>
                    <div className="font-medium">{order.user?.email}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {order.user?.phoneNumber || '-'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        order.status === 'paid'
                          ? 'text-green-500 bg-green-50'
                          : 'text-gray-500'
                      }
                      variant="outline"
                    >
                      {order.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Intl.DateTimeFormat('en-IN').format(order.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    ₹{new Intl.NumberFormat('en-IN').format(order.amount / 100)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      <Pagination className="my-10 mx-auto">
        <PaginationContent>
          <PaginationItem>
            {page > 1 ? (
              <PaginationPrevious href={`?page=${Math.max(page - 1, 1)}`} />
            ) : (
              <span className="text-gray-400 cursor-not-allowed mx-3">
                Previous
              </span>
            )}
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={`?page=${index + 1}`}
                isActive={page === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            {page < totalPages ? (
              <PaginationNext
                href={`?page=${Math.min(page + 1, totalPages)}`}
              />
            ) : (
              <span className="text-gray-400 cursor-not-allowed mx-3">
                Next
              </span>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default OrdersPage;
