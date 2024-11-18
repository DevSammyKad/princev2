import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
const data = [
  {
    top: 'Company',
    list: [
      ['About', 'https://google.com'],
      ['Features', 'link1'],
      ['Works', 'link1'],
      ['Career', 'link1'],
    ],
  },
  {
    top: 'Help',
    list: [
      ['Customer Support', 'https://google.com'],
      ['Delivery Details', 'link1'],
      ['Terms & Conditions', 'link1'],
      ['Privacy Policy', 'link1'],
    ],
  },
  {
    top: 'Account',
    list: [
      ['Account', 'https://google.com'],
      ['Track Orders', 'link1'],
      ['Orders', 'link1'],
      ['Affiliate Account', 'link1'],
    ],
  },
];

export default function Footer() {
  return (
    <>
      <footer className="relative w-full bg-black rounded-lg text-white">
        <div className="w-full px-8 mx-auto ">
          <div className="grid w-full grid-cols-2 gap-8 py-12 mx-auto md:grid-cols-3 lg:grid-cols-4 items-center justify-center">
            {data.map((item, index) => (
              <div className="w-full text-start" key={index}>
                <p className="block mb-4 font-sans text-sm antialiased font-bold leading-normal uppercase opacity-50">
                  {item.top}
                </p>
                <ul className="space-y-1">
                  {item.list.map((listItem, index) => (
                    <li
                      className="block font-sans text-base antialiased font-normal leading-relaxed"
                      key={index}
                    >
                      <Link
                        href={listItem[1]}
                        className="inline-block py-1 pr-2 transition-transform hover:scale-105"
                      >
                        {listItem[0]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="md:w-full">
              <h2 className="text-3xl font-bold tracking-tight max-sm:text-xl">
                Subscribe to our newsletter.
              </h2>

              <div className="mt-6 flex max-w-md gap-x-4 max-sm:flex-col max-sm:gap-4">
                <Label htmlFor="email-address" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                />
                <Button
                  type="submit"
                  className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full py-4 border-t border-blue-gray-50 md:flex-row md:justify-between">
            <p className="block mb-4 font-sans text-sm antialiased font-normal leading-normal text-center md:mb-0">
              &#169; 2024 All Rights Reserved Prince Glow Industries
            </p>
            <div className="flex gap-4 sm:justify-center">
              <Link
                href="#"
                className="block font-sans text-base antialiased font-light leading-relaxed transition-opacity opacity-80 hover:opacity-100"
              >
                <FacebookIcon />
              </Link>
              <Link
                href="#"
                className="block font-sans text-base antialiased font-light leading-relaxed transition-opacity opacity-80 hover:opacity-100"
              >
                <InstagramIcon />
              </Link>
              <Link
                href="#"
                className="block font-sans text-base antialiased font-light leading-relaxed transition-opacity opacity-80 hover:opacity-100"
              >
                <TwitterIcon />
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <p>
              Designed by
              <a href="https://technolize.in " className="text-blue-500">
                &nbsp;Technolize Pvt. Ltd
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

const FacebookIcon = () => {
  return (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const InstagramIcon = () => {
  return (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const TwitterIcon = () => {
  return (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996A4.107 4.107 0 0016.616 4c-2.27 0-4.106 1.835-4.106 4.105 0 .32.036.633.106.93C8.09 8.924 5.494 7.435 3.671 5.191a4.086 4.086 0 00-.556 2.064c0 1.423.723 2.68 1.823 3.418a4.093 4.093 0 01-1.86-.514v.052c0 1.987 1.414 3.644 3.292 4.018a4.093 4.093 0 01-1.853.07c.521 1.627 2.033 2.81 3.826 2.843a8.233 8.233 0 01-5.096 1.756c-.331 0-.66-.019-.98-.057a11.617 11.617 0 006.29 1.847"></path>
    </svg>
  );
};
