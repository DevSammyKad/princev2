// api/razorpay/route.ts
import prisma from '@/lib/db';
import { redis } from '@/lib/redis';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { use } from 'react';

export async function POST(request: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return redirect('/');
    }

    const { razorpayPaymentId, orderId, amount, userEmail, productDetails } =
      await request.json();

    // Confirm payment with Razorpay API if needed here (optional)
    // Verify user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found. Please ensure a valid user email.' },
        { status: 404 }
      );
    }
    // Create order after payment is confirmed
    const newOrder = await prisma.order.create({
      data: {
        id: orderId,
        status: 'paid',
        amount: amount,
        user: {
          connect: { email: userEmail },
        },
        productDetails,
      },
    });
    console.log('New Order Created', newOrder);

    await redis.del(`cart-${user.id}`);

    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true, newOrder }, { status: 200 });
  } catch (error) {
    console.error('Error creating order after payment:', error);
    return NextResponse.json(
      { error: 'Order creation failed' },
      { status: 500 }
    );
  }
}
