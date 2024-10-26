import BestSellersProducts from '../components/storefront/bestSellers';
import CategoriesNavbar from '../components/storefront/CategoriesNavbar';
import { CategoriesSelection } from '../components/storefront/CategorySelection';
import FeaturedProducts from '../components/storefront/FeaturedProducts';
import Handpicked from '../components/storefront/Handpicked';
import Hero from '../components/storefront/Hero';
import KidsSpecialProducts from '../components/storefront/KidsSpecial';
import TrendingProducts from '../components/storefront/TrendingProducts';

export default function IndexPage() {
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
