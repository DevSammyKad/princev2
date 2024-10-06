import { CategoriesSelection } from '../components/storefront/CategroySelection';
import FeaturedProducts from '../components/storefront/FeaturedProducts';
import Handpicked from '../components/storefront/Handpicked';
import Hero from '../components/storefront/Hero';
import TrendingProducts from '../components/storefront/TrendingProducts';

export default function IndexPage() {
  return (
    <div className="">
      <Hero />

      <CategoriesSelection />
      <Handpicked />
      <FeaturedProducts />
      <TrendingProducts />
    </div>
  );
}
