import GlobalSearchData from '@/lib/GlobalSearchData';
import BestSellersProducts from '../components/storefront/BestSellers';
import CategoriesNavbar from '../components/storefront/CategoriesNavbar';
import { CategoriesSelection } from '../components/storefront/CategorySelection';
import FeaturedProducts from '../components/storefront/FeaturedProducts';
import GlobalSearch from '../components/storefront/GlobalSearch';
import Handpicked from '../components/storefront/Handpicked';
import Hero from '../components/storefront/Hero';
import KidsSpecialProducts from '../components/storefront/KidsSpecial';
import TrendingProducts from '../components/storefront/TrendingProducts';

export default async function IndexPage() {
  return (
    <div className="">
      <CategoriesNavbar />
      <Hero />

      {/* <CategoriesSelection /> */}
      <div className="w-[90%] mx-auto rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl text-center tracking-wide my-10 ">
          Handpicked
        </h2>
        <Handpicked />
      </div>

      <FeaturedProducts />
      <TrendingProducts />
      <KidsSpecialProducts />
      <BestSellersProducts />
    </div>
  );
}
