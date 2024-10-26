'use server';
import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import {
  bannerSchema,
  categorySchema,
  productSchema,
  userSchema,
} from '@/lib/zodSchemas';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '@/lib/db';
import { ProductStatus } from '@prisma/client';
import { redis } from '@/lib/redis';
import { Cart } from '@/lib/interfaces';
import { revalidatePath } from 'next/cache';
import { razorpay } from '@/lib/razorpay';
import { json } from 'stream/consumers';

export async function updateUser(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/api/auth/login');
  }

  const submission = parseWithZod(formData, {
    schema: userSchema,
  });
  console.log('Form Data:', formData.get('userId') as string);

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const userId = formData.get('userId') as string;
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      email: submission.value.email,
      phoneNumber: submission.value.phoneNumber,
      address: submission.value.address,
      city: submission.value.city,
      state: submission.value.state,
      country: submission.value.country,
      pincode: submission.value.pincode,
      profileImage: submission.value.profileImage,
    },
  });
}

export async function createCategory(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'princeglow.india@gmail.com') {
    return redirect('/');
  }

  const submission = parseWithZod(formData, {
    schema: categorySchema,
  });

  console.log('Form Data:', formData.get('parentCategory'));

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const parentId =
    (formData.get('parentCategory') as string) === 'none'
      ? null
      : (formData.get('parentCategory') as string | null); // This will now get the correct parentId (id)

  console.log('Parent ID:', parentId);
  await prisma.category.create({
    data: {
      name: submission.value.name,
      slug: submission.value.slug,
      imageString: submission.value.imageString,
      parentId: parentId || null, // If no parent, it's top-level
      updatedAt: new Date(),
    },
  });

  return redirect('/dashboard/categories');
}

export async function editCategory(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'princeglow.india@gmail.com') {
    return redirect('/');
  }

  const submission = parseWithZod(formData, {
    schema: categorySchema,
  });

  console.log('Form Data:', formData);

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const categoryId = formData.get('categoryId') as string;
  if (!categoryId) {
    throw new Error('Category ID is missing');
  }

  // Determine parent category (null for top-level)
  const parentId =
    (formData.get('parentCategory') as string) === 'none'
      ? null
      : (formData.get('parentCategory') as string | null);

  console.log('Parent ID:', parentId);

  await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name: submission.value.name,
      slug: submission.value.slug,
      imageString: submission.value.imageString,
      parentId: parentId || null, // If no parent, it's top-level
      updatedAt: new Date(),
    },
  });
  return redirect('/dashboard/categories');
}

export async function deleteCategory(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'princeglow.india@gmail.com') {
    return redirect('/');
  }

  const categoryId = formData.get('categoryId') as string;
  if (!categoryId) {
    throw new Error('Category ID is Missing');
  }

  const subcategories = await prisma.category.findMany({
    where: {
      parentId: categoryId,
    },
  });

  const products = await prisma.product.findMany({
    where: {
      categoryId: categoryId,
    },
  });

  if (subcategories.length > 0 || products.length > 0) {
    const productList = products.map((product) => product.name).join(', ');
    const subcategoryList = subcategories.map((sub) => sub.name).join(', ');

    let errorMessage = 'Cannot delete category. ';
    if (subcategories.length > 0) {
      errorMessage += `It has the following subcategories: ${subcategoryList}. `;
    }
    if (products.length > 0) {
      errorMessage += `It has the following products: ${productList}.`;
    }

    return { error: errorMessage }; // Return the error message with product/subcategory names
  }
  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  return redirect('/dashboard/categories');
}

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'princeglow.india@gmail.com') {
    return redirect('/');
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });
  if (submission.status !== 'success') {
    return submission.reply();
  }

  const flattenUrls: string[] = submission.value.images.flatMap(
    (urlString: string) => urlString.split(',').map((url: string) => url.trim())
  );

  const category = await prisma.category.findUnique({
    where: { slug: submission.value.category }, // Assuming you are passing the category slug
  });

  if (!category) {
    throw new Error('Category not found');
  }

  // const tagNames = submission.value.tags.split(',').map((tag: string) => tag.trim());

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      shortDescription: submission.value.shortDescription,
      status: submission.value.status as ProductStatus,
      price: Number(submission.value.price),
      salePrice: Number(submission.value.salePrice),
      images: flattenUrls,
      isFeatured: Boolean(submission.value.isFeatured === true ? true : false),
      category: { connect: { id: category.id } },
    },
  });

  return redirect('/dashboard/products');
}

export async function editProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'princeglow.india@gmail.com') {
    return redirect('/');
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });
  if (submission.status !== 'success') {
    return submission.reply();
  }
  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(',').map((url) => url.trim())
  );

  const category = await prisma.category.findUnique({
    where: { id: submission.value.category }, // Assuming you are passing the category slug
  });

  if (!category) {
    throw new Error('Category not found');
  }

  const productId = formData.get('productId') as string;
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      shortDescription: submission.value.shortDescription,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      salePrice: submission.value.salePrice,
      images: flattenUrls,
      isFeatured: submission.value.isFeatured === true ? true : false,
      category: { connect: { id: category.id } },
    },
  });
  return redirect('/dashboard/products');
}

export async function deleteProduct(fromData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'princeglow.india@gmail.com') {
    return redirect('/');
  }
  const productId = fromData.get('productId') as string;
  await prisma.product.delete({
    where: {
      id: productId,
    },
  });
  redirect('/dashboard/products');
}

export async function createBanner(prevState: unknown, fromData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'princeglow.india@gmail.com') {
    return redirect('/');
  }

  const submission = parseWithZod(fromData, {
    schema: bannerSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect('/dashboard/banners');
}

export async function deleteBanner(fromData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'princeglow.india@gmail.com') {
    return redirect('/');
  }
  const bannerId = fromData.get('bannerId') as string;

  await prisma.banner.delete({
    where: {
      id: bannerId,
    },
  });

  redirect('/dashboard/banners');
}

export async function addItem(productId: string, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  const quantity = parseInt(formData.get('quantity') as string, 10);
  if (!quantity || quantity <= 0) {
    throw new Error('Invalid Quantity');
  }

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  const selectedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      images: true,
      price: true,
      salePrice: true,
    },
    where: {
      id: productId,
    },
  });

  if (!selectedProduct) {
    throw new Error('No product With this id');
  }

  let myCart = {} as Cart;

  if (!cart || !Array.isArray(cart.items)) {
    myCart = {
      userId: user.id,
      items: [
        {
          price: selectedProduct.price,
          salePrice: selectedProduct.salePrice,
          id: selectedProduct.id,
          imageString: selectedProduct.images[0],
          name: selectedProduct.name,
          quantity: quantity,
        },
      ],
    };
  } else {
    let itemFound = false;

    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += quantity;
      }
      return item;
    });

    if (!itemFound) {
      myCart.items.push({
        salePrice: selectedProduct.salePrice,
        price: selectedProduct.price, // Ensure price is included
        id: selectedProduct.id,
        imageString: selectedProduct.images[0], // Assuming there's at least 1 image
        name: selectedProduct.name,
        quantity: quantity,
      });
    }
  }

  await redis.set(`cart-${user.id}`, myCart);

  revalidatePath('/');
}

export async function delItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  const productId = formData.get('productId');

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };

    await redis.set(`cart-${user.id}`, updateCart);

    revalidatePath('/', 'layout');
  }
}

export async function checkOut() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items.length) {
    // Calculate the total amount in paise
    const totalAmount =
      cart.items.reduce(
        (sum, item) => sum + item.salePrice * item.quantity,
        0
      ) * 100; // Total amount in paise (multiply by 100)

    // Create a comma-separated string of product IDs
    const productDetails = cart.items.map((item) => ({
      productIds: item.id,
      quantity: item.quantity,
    }));

    const receiptId = `order_rcptid_${user.id}`.substring(0, 40);
    // Create an order with Razorpay
    const order = await razorpay.orders.create({
      amount: totalAmount, // amount in paise
      currency: 'INR',
      receipt: receiptId,
      notes: {
        userId: user.id,
        userEmail: user.email,
        productDetails: JSON.stringify(productDetails),
      },
    });

    console.log('Payment Order Details', order);

    // Return order details for client-side checkout
    return {
      orderId: order.id,
      totalAmount,
      userEmail: user.email,
      productDetails,
    };
  } else {
    console.error('Cart is empty or not found.');
    return null;
  }
}
