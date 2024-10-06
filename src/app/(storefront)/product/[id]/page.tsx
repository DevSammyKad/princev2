'use server';
import { addItem } from '@/app/actions';
import { ShoppingBagButton } from '@/app/components/dashboard/SubmitButton';
import FeaturedProducts from '@/app/components/storefront/FeaturedProducts';
import ImageSlider from '@/app/components/storefront/ImageSlider';
import ProductCounter from '@/app/components/storefront/ProductCounter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import prisma from '@/lib/db';
import { Minus, Plus, StarIcon } from 'lucide-react';
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
            <StarIcon className="text-yellow-500 h-4 w-4 fill-yellow-400" />
            <StarIcon className="text-yellow-500 h-4 w-4 fill-yellow-400" />
            <StarIcon className="text-yellow-500 h-4 w-4 fill-yellow-400" />
            <StarIcon className="text-yellow-500 h-4 w-4 fill-yellow-400" />
            <StarIcon className="text-yellow-500 h-4 w-4 fill-yellow-400" />
          </div>
          <div className="flex items-center gap-2">
            <del className="text-gray-500">
              <h2 className="tracking-wide text-2xl font-semibold text-gray-500">
                {`${data.price} ₹`}
              </h2>
            </del>
            <h1 className="tracking-wide text-2xl font-semibold">
              {`${data.salePrice} ₹`}
            </h1>
          </div>
          <p className="text-gray-600">{data.shortDescription}</p>

          <div className="border-t border-gray-200 pt-6">
            <Label htmlFor="colors" className="">
              Select Colors
            </Label>
            <Input
              checked
              className="bg-red-500 rounded-full w-10 h-10 mt-4"
              disabled
              id="colors"
            />
          </div>
          <div className="border-t border-gray-200 pt-6 flex flex-col">
            <Label htmlFor="sizes" className="">
              Select Size
            </Label>
            <div className="flex items-center space-x-5">
              <Button className="bg-gray-300 rounded-lg mt-4" id="sizes">
                Xl
              </Button>
              <Button className="bg-gray-300 rounded-lg mt-4" id="sizes">
                xs
              </Button>
              <Button
                disabled
                className="bg-gray-300 rounded-lg mt-4 cursor-not-allowed"
                id="sizes"
              >
                M
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-7 w-full border-t border-gray-200 pt-6 ">
            <div className="flex items-center gap-2">
              <Button variant="secondary">
                <Minus className="w-5 h-5" size="icon" />
              </Button>
              <span>""</span>
              <Button variant="secondary">
                <Plus className="w-5 h-5" size="icon" />
              </Button>
            </div>
            <form action={addProductToCart} method="post">
              <ShoppingBagButton />
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold mb-4">Product Description</h2>
        <p className="text-gray-700">{data.description}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>High-quality material</li>
          <li>Durable and long-lasting</li>
          <li>Easy to clean and maintain </li>
        </ul>
      </div>
      <FeaturedProducts />
    </div>
  );
}
