// import Footer from '../components/storefront/Footer';
import AboveFooter from '../components/storefront/AboveFooter';
import Footer from '../components/storefront/Footer';
import Navbar from '../components/storefront/Navbar';
import TopBanner from '../components/storefront/TopBanner';

export default function StoreFrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" mx-auto">
      <TopBanner />
      <Navbar />
      <main className="mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
      <AboveFooter />
      <Footer />
    </div>
  );
}
