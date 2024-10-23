'use client';

import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ProductCounterProps {
  initialQuantity: number;
  onQuantityChange: (quantity: number) => void;
}

const ProductCounter = ({
  initialQuantity,
  onQuantityChange,
}: ProductCounterProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    onQuantityChange(quantity); // Notify parent about quantity change
  }, [quantity, onQuantityChange]);

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={handleDecrement}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="mx-3 w-8 text-center">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={handleIncrement}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProductCounter;
