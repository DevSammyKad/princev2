import {
  HomeIcon,
  LucideIcon,
  ShieldCheck,
  CircleGauge,
  Undo2,
  BadgePercent,
} from 'lucide-react';

export const Links = [
  {
    path: '/',
    heading: 'Home',
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

export const aboveFooterData = [
  {
    icons: BadgePercent,
    title: 'Free Shipping',
    para: 'On all orders above ₹ 495.00',
  },
  {
    icons: Undo2,
    title: 'Easy returns',
    para: 'Easy return & refund policy',
  },
  {
    icons: CircleGauge,
    title: 'Fast Shipping',
    para: 'Order : Same-day dispatch',
  },
  {
    icons: ShieldCheck,
    title: '100% Secure Checkout',
    para: 'UPI / Bank Trasfer / Card / Wallet',
  },
];

export type AboveFooterType = {
  icons: LucideIcon | string;
  title: string;
  para: string;
};
