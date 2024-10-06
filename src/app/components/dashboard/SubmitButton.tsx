'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { checkOut } from '@/app/actions';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CheckOutResponse {
  orderId: string;
  totalAmount: number;
  userEmail: string | null;
}

export function CheckOutButton() {
  const { pending } = useFormStatus();
  const [orderDetails, setOrderDetails] = useState<CheckOutResponse | null>(
    null
  );

  // This function will handle the Razorpay checkout popup
  const handleRazorpayCheckout = (
    orderId: string,
    totalAmount: number,
    userEmail: string | null
  ) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with your Razorpay key
      amount: totalAmount, // Amount in paise
      currency: 'INR',
      name: 'Prince Glow',
      description: 'Purchase Description',
      order_id: orderId, // This is the orderId returned from Razorpay
      handler: function (response: any) {
        // Payment was successful, you can verify the payment server-side here
        console.log(response);
      },
      prefill: {
        email: userEmail ?? '', // Handle null email case
      },
      theme: {
        color: '#F37254',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  // Handle form submission to trigger the Razorpay checkout
  const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Call the server-side action to get the order details
    const response: CheckOutResponse | null = await checkOut();

    if (response && response.orderId && response.totalAmount) {
      setOrderDetails({
        orderId: response.orderId,
        totalAmount: response.totalAmount,
        userEmail: response.userEmail,
      });
      handleRazorpayCheckout(
        response.orderId,
        response.totalAmount,
        response.userEmail
      );
      console.log(orderDetails);
    } else {
      console.error('Order details are missing or undefined.');
    }
  };

  return (
    <form onSubmit={handleCheckout}>
      <Button
        type="submit"
        disabled={pending}
        className="flex items-center justify-center space-x-2"
      >
        {pending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <ShoppingBag className="mr-2" />
        )}
        {pending ? 'Processing...' : 'Checkout'}
      </Button>
    </form>
  );
}

interface buttonProps {
  text: string;
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
}
const SubmitButton = ({ text, variant }: buttonProps) => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin " />{' '}
          {` ${text} Product`}
        </Button>
      ) : (
        <Button variant={variant} size="lg" type="submit" className="my-5">
          {` ${text} Product`}
        </Button>
      )}
    </>
  );
};
export default SubmitButton;

export function ShoppingBagButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full rounded-xl gap-4">
          <Loader2 className="w-5 h-5 animate-spin" size="icon" />
          please Wait{' '}
        </Button>
      ) : (
        <Button className="w-full rounded-xl gap-4" size="lg" type="submit">
          <ShoppingBag className="w-5 h-5 " size="icon" /> Add to Cart
        </Button>
      )}
    </>
  );
}

export function DeleteItemButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="destructive">Removing..</Button>
      ) : (
        <Button variant="destructive">Remove</Button>
      )}
    </>
  );
}
// export function CheckOutButton() {
//   const { pending } = useFormStatus();
//   return (
//     <>
//       {pending ? (
//         <Button disabled size="lg" className="w-full rounded-xl gap-4">
//           <Loader2 className="w-5 h-5 animate-spin" size="icon" />
//           please Wait{' '}
//         </Button>
//       ) : (
//         <Button className="w-full rounded-xl gap-4" size="lg" type="submit">
//           <ShoppingBag className="w-5 h-5 " size="icon" /> Payment Now
//         </Button>
//       )}
//     </>
//   );
// }
