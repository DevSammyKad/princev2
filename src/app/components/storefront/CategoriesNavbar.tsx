import prisma from '@/lib/db';
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import Image from 'next/image';
import placeholder from '../../../../public/placeholder.jpg';
import Link from 'next/link';

const CategoriesNavbar = async () => {
  const categories = await prisma.category.findMany({
    include: {
      subcategories: true,
    },
  });
  return (
    <div className="flex items-center justify-center  ">
      <NavigationMenu className="w-full text-black">
        <NavigationMenuList className="w-full space-x-5 text-black">
          {categories.map((category) => (
            <NavigationMenuItem key={category.id} className="text-black">
              {category.subcategories.length > 0 ? (
                <>
                  <NavigationMenuTrigger className="text-black hover:text-blue-500">
                    {category.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="rounded-md bg-gradient-to-b from-muted/50 to-muted  w-full  no-underline outline-none focus:shadow-md flex ">
                    <div className="flex items-center justify-center">
                      <NavigationMenuLink asChild>
                        <Link href={`/products/${category.slug}`}>
                          <div className="my-2 text-lg font-medium flex w-full space-x-5 px-3">
                            {category.subcategories.map((subcategory) => (
                              <Link href={`/products/${subcategory.slug}`}>
                                <div
                                  key={subcategory.id}
                                  className="flex flex-col items-center text-center"
                                >
                                  <div>
                                    <Image
                                      src={
                                        subcategory.imageString || placeholder
                                      }
                                      alt={subcategory.slug}
                                      width={300}
                                      height={300}
                                      className="max-h-32 max-w-32 rounded-full object-cover"
                                    />
                                  </div>
                                  <span className="text-black hover:text-blue-500">
                                    {subcategory.name}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>{' '}
                </>
              ) : (
                // Category without subcategories
                <NavigationMenuLink asChild className="text-blue-500">
                  <Link href={`/products/${category.slug}`}>
                    {category.name}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default CategoriesNavbar;
