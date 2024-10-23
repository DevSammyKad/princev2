'use server';
import { addItem } from '@/app/actions';
import FeaturedProducts from '@/app/components/storefront/FeaturedProducts';
import ImageSlider from '@/app/components/storefront/ImageSlider';
import ProductAddToCart from '@/app/components/storefront/ProductAddToCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import prisma from '@/lib/db';
import { StarIcon } from 'lucide-react';
import { notFound } from 'next/navigation';

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      salePrice: true,
      images: true,
      shortDescription: true,
      category: true,
      description: true,
      name: true,
      id: true,
    },
  });

  if (!data) {
    notFound();
  }

  return data;
}

export default async function ProductIdRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  const addProductToCart = addItem.bind(null, data.id);
  if (!data) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <ImageSlider images={data.images} />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <div className="flex space-x-2">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className="text-yellow-500 h-4 w-4 fill-yellow-400"
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <del className="text-gray-500">
              <span className="text-2xl text-center font-semibold">{`${data.price} ₹`}</span>
            </del>
            <span className="text-2xl font-semibold text-primary">{`${data.salePrice} ₹`}</span>
          </div>
          <p className="text-gray-600">{data.shortDescription}</p>

          <div className="border-t  border-gray-200 pt-6">
            <Label htmlFor="colors">Select Color</Label>

            <div className="flex gap-x-4 mt-2">
              <Button className="bg-gray-400 rounded-full h-8 w-8"></Button>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 ">
            <Label htmlFor="sizes">Select Size</Label>
            <div className="flex items-center space-x-5">
              {['XS', 'S', 'M', 'L ', 'XL'].map((size, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="bg-gray-300 rounded-lg mt-4 cursor-not-allowed"
                  id="sizes"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4 border-t border-gray-200 pt-6">
            <ProductAddToCart
              productId={data.id}
              addProductToCart={addProductToCart}
            />
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-200 pt-6">
        <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{data.description}</p>
      </div>
      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>High-quality organic cotton material</li>
          <li>Durable and long-lasting construction</li>
          <li>Easy to clean and maintain</li>
          <li>Modern fit for a stylish look</li>
        </ul>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
        <FeaturedProducts />
      </div>
    </div>
  );
}
