'use client';
import { cn } from '@/lib/utils';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Links = [
  // {
  //   path: '/',
  //   heading: 'Home',
  //   icon: HomeIcon,
  // },
  {
    path: '/products/all',
    heading: 'All Products',
    icon: '',
  },
  {
    path: '/products/men',
    heading: 'Viral Gadget',
    icon: '',
  },
];
export const MenuLinks = [
  {
    path: '/homeutility',
    heading: 'Home Utility',
    icon: HomeIcon,
  },
  {
    path: '/products',
    heading: 'All Products',
    icon: '',
  },
  {
    path: '/viralgadget',
    heading: 'Viral Gadget',
    icon: '',
  },
];

export function NavLinks() {
  const pathLocation = usePathname();
  return (
    <div className="hidden md:flex items-center space-x-2 ml-5">
      {Links.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className={cn(
            pathLocation === item.path
              ? 'bg-muted text-primary '
              : 'hover:bg-muted hover:bg-opacity-75',
            'p-2 font-medium'
          )}
        >
          {item.heading}
        </Link>
      ))}
    </div>
  );
}
