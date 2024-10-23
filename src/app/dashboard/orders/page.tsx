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

async function getOrders() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
    },
  });
  return orders;
}

const OrdersPage = async () => {
  const orders = await getOrders();

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
                  <TableCell className="">
                    <div className="font-medium">
                      {' '}
                      {`${order.user?.firstName} ${order.user?.lastName}`}
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {order.user?.address || '-'} {order.user?.city || '-'}{' '}
                      {order.user?.state || '-'} {order.user?.pincode || '-'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{order.user?.email}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {order.user?.phoneNumber || '-'}
                    </div>
                  </TableCell>

                  <TableCell className="">
                    <Badge
                      className={`${
                        order.status === 'paid'
                          ? 'text-green-500 bg-green-50'
                          : 'text-gray-500'
                      }`}
                      variant="outline"
                    >
                      {order.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell ">
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
      <Pagination className="my-10 mx-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default OrdersPage;
