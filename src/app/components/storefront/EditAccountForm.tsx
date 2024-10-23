'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { updateUser } from '@/app/actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { userSchema } from '@/lib/zodSchemas';
import { useFormState } from 'react-dom';

import { UpdateUserButton } from '../dashboard/SubmitButton';
import { Button } from '@/components/ui/button';

interface iAppProps {
  data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    phoneNumber: string | null;
    address: string | null;
    pincode: number | null;
    city: string | null;
    state: string | null;
    country: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}
const EditAccountForm = ({ data }: iAppProps) => {
  if (!data) {
    // Handle the case when data is null (e.g., render a loading state or an error message)
    return <p>Loading...</p>;
  }
  const [lastResult, action] = useFormState(updateUser, undefined);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: userSchema });
    },

    // Validate the form on blur event triggered

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
    defaultValue: data,
  });
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Use a permanent address where you can receive mail.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <input type="hidden" name="userId" value={data.id} />
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 flex space-x-3 items-center ">
              <div className="w-full">
                {' '}
                <Label htmlFor="first-name">First Name</Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    id="first-name"
                    placeholder="First name"
                    key={fields.firstName.key}
                    name={fields.firstName.name}
                    defaultValue={data?.firstName}
                  />
                </div>
                <p className="text-red-500 text-sm h-2 mt-1">
                  {fields.firstName.errors}
                </p>
              </div>
              <div className="w-full">
                {' '}
                <Label htmlFor="last-name">Last Name</Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    id="last-name"
                    placeholder="Last name"
                    key={fields.lastName.key}
                    name={fields.lastName.name}
                    defaultValue={data?.lastName}
                  />
                </div>
                <p className="text-red-500 text-sm h-2 mt-1">
                  {fields.lastName.errors}
                </p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <Label
                htmlFor="phoneNumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </Label>
              <div className="mt-2">
                <Input
                  type="number"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  key={fields.phoneNumber.key}
                  name={fields.phoneNumber.name}
                  defaultValue={data?.phoneNumber || ''}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <p className="text-red-500 text-sm h-2 mt-1">
                {fields.phoneNumber.errors}
              </p>
            </div>

            <div className="sm:col-span-3">
              <Label htmlFor="email">Email address</Label>
              <div className="mt-2">
                <Input
                  id="email"
                  key={fields.email.key}
                  name={fields.email.name}
                  defaultValue={data?.email || ''}
                  type="email"
                  placeholder="Email address"
                />
              </div>
              <p className="text-red-500 text-sm h-2 mt-1">
                {fields.email.errors}
              </p>
            </div>

            <div className="sm:col-span-3">
              <Label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </Label>
              <div className="mt-2">
                <Input
                  type="text"
                  id="postal-code"
                  key={fields.pincode.key}
                  name={fields.pincode.name}
                  defaultValue={data?.pincode || ''}
                  placeholder="ZIP / Postal code"
                />
              </div>
              <p className="text-red-500 text-sm h-2 mt-1">
                {fields.pincode.errors}
              </p>
            </div>

            <div className="col-span-full">
              <Label htmlFor="street-address">Area And Street address</Label>
              <div className="mt-2">
                <Textarea
                  key={fields.address.key}
                  name={fields.address.name}
                  defaultValue={data?.address || ''}
                  id="street-address"
                  placeholder="Street address"
                />
              </div>
              <p className="text-red-500 text-sm h-2 mt-1">
                {fields.address.errors}
              </p>
            </div>

            <div className="sm:col-span-2 ">
              <Label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </Label>
              <div className="mt-2">
                <Input type="text" name="city" id="city" placeholder="City" />
              </div>
              <p className="text-red-500 text-sm h-2 mt-1">
                {fields.city.errors}
              </p>
            </div>

            <div className="sm:col-span-2">
              <Label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State
              </Label>
              <div className="mt-2">
                <Input
                  type="text"
                  key={fields.state.key}
                  name={fields.state.name}
                  defaultValue={data?.state || ''}
                  id="region"
                  placeholder="State"
                />
                <p className="text-red-500 text-sm h-2 mt-1">
                  {fields.state.errors}
                </p>
              </div>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="country">Country</Label>
              <div className="mt-2">
                <Select
                  key={fields.country.key}
                  name={fields.country.name}
                  defaultValue={data?.country || ''}
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Pakistan', 'USA', 'India'].map((country, index) => (
                      <SelectItem key={index} value={country.toLowerCase()}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <p className="text-red-500 text-sm h-2 mt-1">
                {fields.country.errors}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <UpdateUserButton />

          {/* <Button type="submit"> Update</Button> */}
        </CardFooter>
      </Card>
    </form>
  );
};

export default EditAccountForm;
