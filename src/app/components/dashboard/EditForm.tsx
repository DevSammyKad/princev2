'use client';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import placeHolder from '../../../../public/placeholder.jpg';

import { ChevronLeft, XIcon, PlusCircle } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  SelectContent,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { editProduct } from '@/app/actions';
import { parseWithZod } from '@conform-to/zod';
import { productSchema } from '@/lib/zodSchemas';
import { useForm } from '@conform-to/react';
import { UploadDropzone } from '@/lib/uploadthing';
import SubmitButton from '@/app/components/dashboard/SubmitButton';
import { Category, type $Enums } from '@prisma/client';
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/ui/multi-select';

interface iAppProps {
  data: {
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    status: $Enums.ProductStatus;
    images: string[];
    category: string;
    price: number;
    salePrice: number;
    isFeatured: boolean;
    tags: string | string[];
  };
}

// const parseTags = (tags: string) => tags.split(',').map((tag) => tag.trim());

export default function EditForm({ data }: iAppProps) {
  const [categories, setCategories] = useState<Category[] | null>();
  const [images, setImages] = useState<string[]>(data.images);
  const [lastResult, action] = useFormState(editProduct, undefined);

  const initialTags =
    typeof data.tags === 'string' ? JSON.parse(data.tags) : data.tags || [];
  const [tag, setTag] = useState(initialTags);

  useEffect(() => {
    setTag(initialTags); // Sync the `tag` state with `data.tags` on component load or data update
  }, [data.tags]);

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
    defaultValue: data,
  });

  console.log('Data', data.tags);

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  console.log('Categories', categories);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories'); // Assuming you have an API route set up at /api/categories
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
      <input type="hidden" name="productId" defaultValue={data.id} />
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft />
          </Link>
        </Button>
        <h1>Edit Product</h1>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-5 my-5  ">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Update product details here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  key={fields.name.key}
                  name={fields.name.name}
                  defaultValue={data.name}
                  type="text"
                  className="w-full"
                  placeholder="Gamer Gear Pro Controller"
                />

                <p className="text-red-500 text-sm">{fields.name.errors}</p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  key={fields.shortDescription.key}
                  name={fields.shortDescription.name}
                  defaultValue={data.shortDescription}
                  className="min-h-32"
                  placeholder="Write your product Short Description here"
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
                  defaultValue={data.description}
                  className="min-h-32"
                  placeholder="Write your product description here"
                />
                <p className="text-red-500 text-sm">
                  {fields.description.errors}
                </p>
              </div>
              <div className="flex items-center gap-5 ">
                <div className="grid gap-3">
                  <Label>Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Actual Price"
                    key={fields.price.key}
                    name={fields.price.name}
                    defaultValue={data.price}
                  />
                  <p className="text-red-500 text-sm">{fields.price.errors}</p>
                </div>
                <div className="grid gap-3">
                  <Label>Sale Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Sale Price"
                    key={fields.salePrice.key}
                    name={fields.salePrice.name}
                    defaultValue={data.salePrice}
                  />
                  <p className="text-red-500 text-sm">
                    {fields.salePrice.errors}
                  </p>
                </div>
              </div>

              <div className="grid  gap-3">
                <Label>Feature Product</Label>
                <Switch
                  key={fields.isFeatured.key}
                  name={fields.isFeatured.name}
                  // defaultChecked={data.isFeatured}
                  defaultChecked={data.isFeatured}
                  // defaultValue={data.isFeatured} // Convert boolean to string
                />

                <p className="text-red-500 text-sm">
                  {fields.isFeatured.errors}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden max-md:col-span-2">
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
            <CardDescription>Upload AtLeast 1 image</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-contain"
                height="300"
                src={images[0] || placeHolder}
                width="300"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={fields.images.name}
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div key={index} className=" relative w-[100px] h-[100px]">
                      <Image
                        height={100}
                        width={100}
                        src={image || placeHolder}
                        alt="product image"
                        className="w-full p-2 h-full object-cover rounded-lg border"
                      />

                      <Button
                        onClick={() => handleDeleteImage(index)}
                        size="icon"
                        className="absolute -right-3 w-7 h-7  -top-3  bg-red-500 rounded-lg"
                      >
                        <XIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  className="flex"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    console.log(res, 'Upload completed');
                    setImages(res.map((r) => r.url));
                  }}
                  onUploadError={(err) => {
                    console.log(err, 'Upload error');
                    alert('something went wrong');
                  }}
                />
              )}
              <p className="text-sm text-red-500">{fields.images.errors}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-2 gap-5 my-5">
        <Card className="col-span-2  cursor-pointer">
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
              <TableBody className="filter hover:blur-sm backdrop-filter backdrop-blur-lg bg-white  transition-all duration-300">
                <TableRow>
                  <TableCell className="font-semibold">GGPC-001</TableCell>
                  <TableCell>
                    <Label htmlFor="stock-1" className="sr-only">
                      Stock
                    </Label>
                    <Input id="stock-1" type="number" defaultValue="100" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="price-1" className="sr-only">
                      Price
                    </Label>
                    <Input id="price-1" type="number" defaultValue="99.99" />
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
                    <Input id="stock-2" type="number" defaultValue="143" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="price-2" className="sr-only">
                      Price
                    </Label>
                    <Input id="price-2" type="number" defaultValue="99.99" />
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
            <Button size="sm" variant="ghost" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              Add Variant
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full max-md:col-span-2 ">
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
                  defaultValue={data.status}
                >
                  <SelectTrigger id="status" aria-label="Select status">
                    <SelectValue
                      defaultValue="draft"
                      placeholder="Select status"
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
                <Label htmlFor="category">
                  Category{' '}
                  <Link
                    href="/dashboard/categories/create"
                    className="text-blue-500"
                    target="_blank"
                  >
                    ( Create New Category )
                  </Link>
                </Label>{' '}
                <Select
                  key={fields.category.key}
                  name={fields.category.name}
                  defaultValue={data.category}
                >
                  <SelectTrigger id="category" aria-label="Select category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories &&
                      categories.map((category: Category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <p className="text-red-500 text-sm">{fields.category.errors}</p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tags">Tags</Label>
                <MultiSelector
                  values={tag}
                  onValuesChange={setTag}
                  // defaultValue={data.tags as string}
                  className="max-w-xs"
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Select Tags" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      <MultiSelectorItem value={'BestSellers'}>
                        BestSellers
                      </MultiSelectorItem>
                      <MultiSelectorItem value={'Trending'}>
                        Trending
                      </MultiSelectorItem>
                      <MultiSelectorItem value={'KidsSpecial'}>
                        KidsSpecial
                      </MultiSelectorItem>
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
                <input
                  type="hidden"
                  name={fields.tags.name}
                  key={fields.tags.key}
                  value={tag.join(',')}
                  // value={JSON.stringify(tag)}
                />
                <p className="text-red-500 text-sm">{fields.tags.errors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <SubmitButton text={data.id ? 'Edit' : 'Create'} />
    </form>
  );
}
