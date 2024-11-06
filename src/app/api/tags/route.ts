// /pages/api/tags.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const tags = await prisma.tag.findMany();
    console.log('Tags', tags);
    return NextResponse.json(tags);
  } catch (error) {
    console.error('Something went wrong:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    ); // Proper error response handling
  }
}
