import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      include: { subcategories: true },
    });
    return NextResponse.json(categories); // Corrected the usage of NextResponse.json
  } catch (error) {
    console.error('Something went wrong:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    ); // Proper error response handling
  }
}
