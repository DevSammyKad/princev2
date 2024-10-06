// app/api/razorpay/route.ts

import { checkOut } from '@/app/actions';
import { NextResponse } from 'next/server';

// Handle POST requests

export async function POST(request: Request) {
  try {
    const data = await request.json(); // Assuming you're sending JSON data
    // Call checkOut without passing data if it doesn't accept parameters
    const result = await checkOut(); // No arguments passed

    return NextResponse.json(result, { status: 200 }); // Return success response
  } catch (error) {
    console.error('Error processing checkout:', error);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 }); // Return error response
  }
}

// If you want to handle other methods like GET, you can add them as well
export async function GET(request: Request) {
  return NextResponse.json(
    { message: 'GET method not implemented' },
    { status: 405 }
  );
}
