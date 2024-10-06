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
