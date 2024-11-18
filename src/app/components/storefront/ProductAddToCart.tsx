'use client';

import { useState } from 'react';
import ProductCounter from '@/app/components/storefront/ProductCounter';
import { ShoppingBagButton } from '@/app/components/dashboard/SubmitButton';
import { toast } from 'sonner';

interface ProductAddToCartProps {
  productId: string;
  addProductToCart: (formData: FormData) => Promise<void>;
}

export default function ProductAddToCart({
  // productId,
  addProductToCart,
}: ProductAddToCartProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.set('quantity', quantity.toString()); // Update the quantity in the form data
    await addProductToCart(formData);
    toast.success('Product added to cart!');
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-6 items-center ">
      <ProductCounter
        initialQuantity={quantity}
        onQuantityChange={handleQuantityChange}
      />
      <input type="hidden" name="quantity" value={quantity} />
      <ShoppingBagButton />
    </form>
  );
}
