'use client';

import React, { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import placeHolder from '../../../../../public/placeholder.jpg';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Upload, XIcon, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UploadDropzone } from '@/lib/uploadthing';

import { createProduct } from '@/app/actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { productSchema } from '@/lib/zodSchemas';
import { useFormState } from 'react-dom';

import SubmitButton from '@/app/components/dashboard/SubmitButton';

import { Category } from '@prisma/client';

const ProductCreateRoute = () => {
  const [images, setImages] = useState<string[]>([]);

  const [categories, setCategories] = useState<Category[] | null>();

  const [lastResult, action] = useFormState(createProduct, undefined);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const handleDeleteImage = (index: Number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleUploadComplete = (res: any) => {
    const uploadedImages = res.map((file: any) => file.url);
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
    // toast.success('Upload Complete');
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/allcategories'); // Assuming you have an API route set up at /api/categories
        const data = await res.json();
        console.log('categry data', data);
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
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft />
          </Link>
        </Button>
        <h1>New Product</h1>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-5 my-5  ">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Write product details here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  key={fields.name.key}
                  name={fields.name.name}
                  defaultValue={fields.name.initialValue}
                  type="text"
                  className="w-full"
                  placeholder="Gamer Gear Pro Controller"
                />
                <p className="text-red-500 text-sm">{fields.name.errors}</p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea
                  id="shortDescription"
                  key={fields.shortDescription.key}
                  name={fields.shortDescription.name}
                  defaultValue={fields.shortDescription.initialValue}
                  className="min-h-16"
                  placeholder="write your product description here"
                />
                <p className="text-red-500 text-sm">
                  {fields.shortDescription.errors}
                </p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  key={fields.description.key}
                  name={fields.description.name}
                  defaultValue={fields.description.initialValue}
                  className="min-h-32"
                  placeholder="write your product description here"
                  style={{ whiteSpace: 'pre-wrap' }}
                />
                <p className="text-red-500 text-sm">
                  {fields.description.errors}
                </p>
              </div>
              <div className="flex items-start gap-5">
                <div className="grid gap-3 ">
                  <Label>Price</Label>
                  <Input
                    id="price"
                    type="number"
                    className="appearance-none"
                    placeholder="Actual Price"
                    name={fields.price.name}
                    key={fields.price.key}
                    defaultValue={fields.price.initialValue}
                  />
                  <p className="text-red-500 text-sm">{fields.price.errors}</p>
                </div>
                <div className="gird gap-3">
                  <Label>Sale Price</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    placeholder="Sale Price"
                    name={fields.salePrice.name}
                    key={fields.salePrice.name}
                    defaultValue={fields.salePrice.initialValue}
                  />
                  <p className="text-sm text-red-500">
                    {fields.salePrice.errors}
                  </p>
                </div>
              </div>
              <div className="grid  gap-3">
                <Label>Feature Product</Label>
                <Switch
                  key={fields.isFeatured.key}
                  name={fields.isFeatured.name}
                  defaultValue={fields.isFeatured.initialValue}
                  defaultChecked={fields.isFeatured.initialValue as any}
                />
                <p className="text-red-500 text-sm">
                  {fields.isFeatured.errors}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden w-full max-md:col-span-2">
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
            <CardDescription>Upload AtLeast 1 image</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover border-dashed border "
                height={300}
                src={images[0] || placeHolder}
                width={300}
              />
              <div className="grid grid-cols-3 gap-2">
                {images.length < 0 ? (
                  <>
                    {images.slice(1).map((image, index) => (
                      <Button key={index}>
                        <Image
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover border-dashed border"
                          height={84}
                          src={image || placeHolder}
                          width={84}
                        />
                      </Button>
                    ))}
                  </>
                ) : (
                  <>
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover border-dashed border"
                      height={84}
                      src={images[1] || placeHolder}
                      width={84}
                    />
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover border-dashed border"
                      height={84}
                      src={images[2] || placeHolder}
                      width={84}
                    />
                  </>
                )}

                <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <span className="sr-only">Upload</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3">
        <Label>Images</Label>
        <input
          type="hidden"
          value={images}
          key={fields.images.key}
          name={fields.images.name}
          defaultValue={fields.images.initialValue as any}
        />
        {images.length > 0 ? (
          <div className="flex gap-5">
            {images.map((image, index) => (
              <div key={index} className=" relative w-[100px] h-[100px]">
                <Image
                  height={100}
                  width={100}
                  src={image}
                  alt="product image"
                  className="w-full p-2 h-full object-cover rounded-lg border"
                />

                <Button
                  onClick={() => handleDeleteImage(index)}
                  size="icon"
                  className="absolute -right-3 -top-3 bg-red-500 rounded-lg"
                >
                  <XIcon className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-gray-400 bg-gray-100 p-4 rounded-lg hover:bg-gray-200 focus-within:bg-gray-300">
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={handleUploadComplete}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        )}
        <p className="text-sm text-red-500">{fields.images.errors}</p>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-5 my-5">
        <Card className="col-span-2 cursor-pointer">
          <CardHeader>
            <CardTitle>Stock</CardTitle>
            <CardDescription>
              Manage stock as per your product variants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">SKU</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="w-[100px]">Size</TableHead>
                </TableRow>
              </TableHeader>
              {/* hover:blur-sm backdrop-filter backdrop-blur-lg bg-white  transition-all duration-300 */}
              <TableBody className="">
                <TableRow>
                  <TableCell className="font-semibold">GGPC-001</TableCell>
                  <TableCell>
                    <Label htmlFor="stock-1" className="sr-only">
                      Stock
                    </Label>
                    <Input id="stock-1" type="number" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="price-1" className="sr-only">
                      Price
                    </Label>
                    <Input id="price-1" type="number" />
                  </TableCell>
                  <TableCell>
                    <ToggleGroup
                      type="single"
                      defaultValue="s"
                      variant="outline"
                    >
                      <ToggleGroupItem value="s">S</ToggleGroupItem>
                      <ToggleGroupItem value="m">M</ToggleGroupItem>
                      <ToggleGroupItem value="l">L</ToggleGroupItem>
                    </ToggleGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">GGPC-002</TableCell>
                  <TableCell>
                    <Label htmlFor="stock-2" className="sr-only">
                      Stock
                    </Label>
                    <Input id="stock-2" type="number" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="price-2" className="sr-only">
                      Price
                    </Label>
                    <Input id="price-2" type="number" />
                  </TableCell>
                  <TableCell>
                    <ToggleGroup
                      type="single"
                      defaultValue="m"
                      variant="outline"
                    >
                      <ToggleGroupItem value="s">S</ToggleGroupItem>
                      <ToggleGroupItem value="m">M</ToggleGroupItem>
                      <ToggleGroupItem value="l">L</ToggleGroupItem>
                    </ToggleGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">GGPC-003</TableCell>
                  <TableCell>
                    <Label htmlFor="stock-3" className="sr-only">
                      Stock
                    </Label>
                    <Input id="stock-3" type="number" defaultValue="32" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="price-3" className="sr-only">
                      Stock
                    </Label>
                    <Input id="price-3" type="number" defaultValue="99.99" />
                  </TableCell>
                  <TableCell>
                    <ToggleGroup
                      type="single"
                      defaultValue="s"
                      variant="outline"
                    >
                      <ToggleGroupItem value="s">S</ToggleGroupItem>
                      <ToggleGroupItem value="m">M</ToggleGroupItem>
                      <ToggleGroupItem value="l">L</ToggleGroupItem>
                    </ToggleGroup>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-center border-t p-4">
            <Button size="sm" variant="ghost" type="button" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              Add Variant
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full max-md:col-span-2">
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="grid gap-3">
                <Label htmlFor="status">Status</Label>
                <Select
                  key={fields.status.key}
                  name={fields.status.name}
                  defaultValue={fields.status.initialValue}
                >
                  <SelectTrigger id="status" aria-label="Select status">
                    <SelectValue
                      defaultValue="draft"
                      placeholder="Select product status"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Active</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500 text-sm">{fields.status.errors}</p>
              </div>

              <div className="grid gap-3 my-3">
                <Label htmlFor="category">Category</Label>
                <Select
                  key={fields.category.key}
                  name={fields.category.name}
                  defaultValue={fields.category.initialValue}
                >
                  <SelectTrigger id="category" aria-label="Select category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Categories with their Subcategories */}
                    {categories &&
                      categories.map((category: Category) => (
                        <div key={category.id}>
                          {/* Render the main category */}
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>

                          {/* Render subcategories with indentation */}
                          {/* {category.subcategories?.map((subcategory) => (
                            <SelectItem
                              key={subcategory.id}
                              value={subcategory.id}
                              className="ml-4" // Add margin to indent subcategory
                            >
                              {subcategory.name}
                            </SelectItem>
                          ))} */}
                        </div>
                      ))}
                  </SelectContent>
                </Select>
                <p className="text-red-500 text-sm">{fields.category.errors}</p>
              </div>
              <div className="grid gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    name={fields.tags.name}
                    defaultValue={fields.tags.initialValue as string}
                    placeholder="Enter tags, separated by commas"
                    className="w-full"
                  />

                  <p className="text-red-500 text-sm">{fields.tags.errors}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <SubmitButton text={'Create'} />
    </form>
  );
};

export default ProductCreateRoute;
