import CategoriesNavbar from '../components/storefront/CategoriesNavbar';
import { CategoriesSelection } from '../components/storefront/CategorySelection';
import FeaturedProducts from '../components/storefront/FeaturedProducts';
import Handpicked from '../components/storefront/Handpicked';
import Hero from '../components/storefront/Hero';
import TrendingProducts from '../components/storefront/TrendingProducts';

export default function IndexPage() {
  return (
    <div className="">
      <CategoriesNavbar />
      <Hero />

      <CategoriesSelection />
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl text-center tracking-wide my-10 ">
        Handpicked
      </h2>
      <Handpicked />
      <FeaturedProducts />
      <TrendingProducts />
    </div>
  );
}
