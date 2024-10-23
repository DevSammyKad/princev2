import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null, // Ensure we're only getting top-level categories
      },
      select: {
        id: true,
        name: true,
        slug: true,
        imageString: true, // If you want the image URL as well
        createdAt: true,
        updatedAt: true,
        subcategories: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        }, // Optionally include subcategories
      },
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
