'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import placeHolder from '../../../../../public/placeholder.jpg';
import { Input } from '@/components/ui/input';
import { UploadDropzone } from '@/lib/uploadthing';
import SubmitButton from '@/app/components/dashboard/SubmitButton';

import { createCategory } from '@/app/actions';
import { useFormState } from 'react-dom';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { categorySchema } from '@/lib/zodSchemas';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category } from '@prisma/client';
import { toast } from 'sonner';

const CategoryCreateRoute = () => {
  const [image, setImage] = useState<string>();
  const [categories, setCategories] = useState<Category[] | null>();
  const [selectedParent, setSelectedParent] = useState<string>();

  // const slug  = fields.name.name.toLowerCase().replace(/\s/g, ""-);

  const [lastResult, action] = useFormState(createCategory, undefined);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: categorySchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();

        if (res.ok) {
          setCategories(data);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-4 max-w-7xl mx-auto">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/categories">
            <ChevronLeft />
          </Link>
        </Button>
        <h1>New Category</h1>
      </div>
      <Card className="mt-4 max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle>Create Category</CardTitle>
          <CardDescription>
            Create a category to promote your products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex max-sm:flex-col justify-between gap-x-6">
            <div className="flex flex-col gap-5 w-full gap-x-5">
              <div className="flex flex-col gap-3">
                <Label>Category Name</Label>
                <Input
                  type="text"
                  key={fields.name.key}
                  name={fields.name.name}
                  defaultValue={fields.name.initialValue}
                  placeholder="Enter Category name here "
                />
                <p className="text-red-500 text-sm">{fields.name.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Category Slug</Label>
                <Input
                  type="text"
                  key={fields.slug.key}
                  name={fields.slug.name}
                  defaultValue={fields.slug.initialValue}
                  placeholder="Enter Category-slug name here "
                />
                <p className="text-red-500 text-sm">{fields.slug.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label> Select Parent Category</Label>
                <Select onValueChange={(value) => setSelectedParent(value)}>
                  <SelectTrigger
                    id="parentCategory"
                    name="parentCategory"
                    aria-label="Select Parent Category"
                  >
                    <SelectValue placeholder="Select Parent Category (Optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      None (Top-Level Category)
                    </SelectItem>
                    {categories &&
                      categories.map((category: Category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <input
                type="hidden"
                name="parentCategory"
                value={selectedParent}
              />
            </div>

            <div className="flex flex-col gap-3 my-5">
              <Label>Image</Label>
              <input
                type="hidden"
                key={fields.imageString.key}
                name={fields.imageString.name}
                defaultValue={fields.imageString.initialValue}
                value={image}
              />
              {image ? (
                <Image
                  src={image || placeHolder}
                  width={200}
                  height={180}
                  alt="Product Image"
                  className="w-[250px] h-[150px] object-cover border rounded-lg p-5"
                />
              ) : (
                <UploadDropzone
                  className="text-black"
                  onClientUploadComplete={(res) => {
                    const uploadImage = res[0].url;
                    setImage(uploadImage);
                    console.log(res, 'Upload Completed');
                    toast.success('Upload Successfully');
                  }}
                  onUploadError={() => {
                    toast.error('Something went Wrong in Banner ');
                  }}
                  endpoint="categoryImageRoute"
                />
              )}

              <p className="text-red-500 text-sm">
                {fields.imageString.errors}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-end justify-end border-t p-4">
          <SubmitButton text={'Create Category'} />
        </CardFooter>
      </Card>
    </form>
  );
};

export default CategoryCreateRoute;
