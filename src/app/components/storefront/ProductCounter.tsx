'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

export default function ProductCounter({
  initialCount = 1,
}: {
  initialCount?: number;
}) {
  const [count, setCount] = useState(initialCount);

  const handleIncrement: () => void = () => setCount(count + 1);
  const handleDecrement: () => void = () => setCount(count > 1 ? count - 1 : 1);

  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" onClick={handleDecrement}>
        <Minus className="w-5 h-5" size="icon" />
      </Button>
      <span>{count}</span>
      <Button variant="secondary" onClick={handleIncrement}>
        <Plus className="w-5 h-5" size="icon" />
      </Button>

      {/* Hidden input field to send the count value to the server */}
      <input type="hidden" name="quantity" value={count} />
    </div>
  );
}
