// components/storefront/GlobalSearch.tsx
'use client';
import React, { useState } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import Link from 'next/link';
import { Category } from '@prisma/client';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ProductWithCategory {
  id: string;
  name: string;
  salePrice: number;
  category: Category | null;
  images: string[];
}

interface GlobalSearchProps {
  data: ProductWithCategory[];
}

const GlobalSearch = ({ data }: GlobalSearchProps) => {
  const [open, setOpen] = useState(false);

  const limitedData = data.slice(0, 5);

  const uniqueCategories = Array.from(
    new Set(data.map((item) => item.category?.id))
  ).map((id) => data.find((item) => item.category?.id === id)?.category);

  return (
    <div>
      <Command>
        <div className="relative items-center w-full ">
          <Search className="absolute left-2.5 top-[50%] -translate-y-[50%] h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 max-sm:[200px] md:w-[500px] lg:w-[1200px] border-black border focus:bg-none focus:ring-0 focus:border-none"
            onClick={() => setOpen(true)}
            // max-sm:w-[200px] sm:w-[300px] md:w-[200px] lg:w-[500px]
          />
        </div>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder="Type a command or search..."
            onClick={() => setOpen(true)}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Categories">
              {uniqueCategories.slice(0, 5).map((category) => (
                <Link
                  href={`/products/${category?.slug}`}
                  key={category?.id}
                  onClick={() => setOpen(false)}
                >
                  <CommandItem className="cursor-pointer">
                    <div className="flex items-center gap-5">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={category?.imageString || ''}
                        alt={category?.name || 'Category'}
                      />
                      {category?.name}
                    </div>
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Products">
              {limitedData.map((item) => (
                <Link
                  href={`/product/${item.id}`}
                  key={item.id}
                  onClick={() => setOpen(false)}
                >
                  <CommandItem className="cursor-pointer">
                    <div className="flex items-center justify-between w-full gap-5">
                      <div className="flex items-center gap-5">
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          src={item.images[0] || ''}
                          alt={item.name}
                        />
                        {item.name}
                      </div>
                      <div>
                        ₹{new Intl.NumberFormat('en-IN').format(item.salePrice)}
                      </div>
                    </div>
                  </CommandItem>
                </Link>
              ))}
              <Link
                href={'/products/all-products'}
                onClick={() => setOpen(false)}
                className="text-center flex justify-center items-center my-3 px-5 "
              >
                <CommandItem className="px-5 cursor-pointer">
                  View All Products
                </CommandItem>
              </Link>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </Command>
    </div>
  );
};

export default GlobalSearch;
