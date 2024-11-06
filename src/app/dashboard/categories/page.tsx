import { Button } from '@/components/ui/button';
import prisma from '@/lib/db';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

async function getCategories() {
  const data = await prisma.category.findMany({
    include: {
      products: true,
      parent: {
        select: {
          name: true,
        },
      },
    },
  });
  return data;
}

const page = async () => {
  const data = await getCategories();
  return (
    <div>
      <nav className="flex justify-between flex-1 items-start gap-4 p-4 my-4 sm:px-6 sm:py-0 md:gap-8">
        <div>
          <h1>Category</h1>
        </div>
        <div className="gap-5 flex">
          <Link href="/dashboard/categories/create">
            <Button className="flex items-center gap-2">
              <PlusCircle /> Create Category
            </Button>
          </Link>
        </div>
      </nav>
      <main>
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              Manage your Categories and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>parent Id</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Category Slug
                  </TableHead>
                  <TableHead>Products List</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead align="right">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover h-16 w-16"
                        height={64}
                        src={item.imageString || '/placeholder.jpg'}
                        width={64}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    {/* <TableCell>
                      <Badge
                        variant="outline"
                        className={`${
                          item.status === 'published'
                            ? 'bg-green-50 text-green-500 -ml-3'
                            : ''
                        } ${
                          item.status === 'draft'
                            ? ' bg-gray-50 text-gray-500'
                            : ''
                        }
                      `}
                      >
                        {item.status.toUpperCase()}
                      </Badge>
                    </TableCell> */}
                    <TableCell>{item.parent?.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.slug}
                    </TableCell>
                    <TableCell>
                      {item.products.map((product) => (
                        <div key={product.id}>{product.name}</div>
                      ))}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Intl.DateTimeFormat('en-US').format(item.createdAt)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link href={`/dashboard/categories/${item.id}`}>
                              Edit
                            </Link>{' '}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              href={`/dashboard/categories/${item.id}/delete`}
                            >
                              Delete
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>{data.length}</strong>{' '}
              Categories
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default page;
