import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, { message: 'Name should not be empty' }),
  shortDescription: z.string().min(1, 'short Description should not Be Empty'),
  description: z.string().min(1, 'description should be not empty'),
  status: z.enum(['draft', 'published']),
  images: z.array(z.string()).min(1, 'Please provide atLeast one image'),
  category: z.string().min(1, 'Select Minimum 1 Category '),
  price: z.number().min(1, 'Price Must me greater than 0 '),
  salePrice: z.number().min(1, 'Price Must me greater than 0 '),
  isFeatured: z.boolean().optional(),
  // tags: z.array(z.string()).optional(),
  tags: z.array(z.string()).min(1, 'Select at least one tag'),
});

// Category schema with slug generation and uniqueness check
export const categorySchema = z.object({
  name: z.string().min(1, 'Name Should Not be Empty'),
  slug: z
    .string()
    .min(1, 'Slug should not be empty')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must be lowercase, alphanumeric, and hyphen-separated'
    ),
  imageString: z.string().optional(),
  parentCategory: z.union([z.string().uuid().optional(), z.literal('none')]),
});

export const bannerSchema = z.object({
  title: z.string(),
  imageString: z.string(),
});

export const userSchema = z.object({
  firstName: z.string().min(1, 'First Name Should Not be Empty'),
  lastName: z.string().min(1, 'Last Name Should Not be Empty'),
  email: z.string().email('Invalid Email').min(1, 'Email Should Not be Empty'),
  phoneNumber: z.string().min(1, 'Phone Number Should Not be Empty'),
  address: z.string().min(1, 'Address Should Not be Empty'),
  city: z.string().min(1, 'City Should Not be Empty'),
  state: z.string().min(1, 'State Should Not be Empty'),
  country: z.string().min(1, 'Country Should Not be Empty'),
  pincode: z.number().min(1, 'Pincode Should Not be Empty'),
  profileImage: z.string().optional(),
});
