'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2, ShoppingBag } from 'lucide-react';

import { checkOut } from '@/app/actions';

declare global {
  interface Window {
    Razorpay: any;
  }
}

// interface CheckOutResponse {
//   orderId: string;
//   totalAmount: number;
//   userEmail: string | null;
//   productDetails: { productId: string; quantity: number }[];
// }

export function CheckOutButton() {
  const { pending } = useFormStatus();

  // This function will handle the Razorpay checkout popup
  const handleRazorpayCheckout = async (
    orderId: string,
    totalAmount: number,
    userEmail: string | null,
    productDetails: { productId: string; quantity: number }[]
  ) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with your Razorpay key
      amount: totalAmount, // Amount in paise
      currency: 'INR',
      name: 'Prince Glow',
      description: 'Purchase Description',
      order_id: orderId, // This is the orderId returned from Razorpay
      handler: async function (response: any) {
        // Payment was successful, you can verify the payment server-side here

        const paymentResponse = await fetch('/api/razorpay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razorpayPaymentId: response.razorpay_payment_id,
            orderId: orderId,
            amount: totalAmount,
            userEmail: userEmail,
            productDetails,
          }),
        });

        if (paymentResponse.ok) {
          console.log('Order created successfully after payment.');
        } else {
          console.error('Failed to create order.');
        }
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
    try {
      const response = await checkOut();

      if (
        response &&
        response.orderId &&
        response.totalAmount &&
        response.productDetails
      ) {
        await handleRazorpayCheckout(
          response.orderId,
          response.totalAmount,
          response.userEmail,
          response.productDetails as any
        );
      } else {
        console.error('Failed to get Razorpay order details.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
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
        <Button disabled={pending} className=" rounded-xl gap-4 my-5">
          <Loader2 className="mr-2 h-4 w-4 animate-spin " />{' '}
          {` ${text} Product`}
        </Button>
      ) : (
        <Button
          variant={variant}
          size="lg"
          type="submit"
          className="my-5 rounded-xl gap-4"
        >
          {` ${text} Product`}
        </Button>
      )}
    </>
  );
};
export default SubmitButton;

export function UpdateUserButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending} // Only disable when pending
      size="lg"
      type="submit"
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" size="icon" />
          Please Wait
        </>
      ) : (
        'Update Account'
      )}
    </Button>
  );
}

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
