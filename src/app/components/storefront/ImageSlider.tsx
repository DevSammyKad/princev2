'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface iAppProps {
  images: string[];
}

export default function ImageSlider({ images }: iAppProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handlePreviousClick = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const handleNextClick = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handleImageClick = (index: number) => {
    setMainImageIndex(index);
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-3 items-start">
        {/* Thumbnails for larger screens (lg and above) */}
        <div className="hidden lg:flex items-center justify-center">
          <div
            className={`grid grid-rows-${
              images.length || 5
            } grid-cols-auto-fit min-w-[100px] gap-5 mx-2`}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={cn(
                  index === mainImageIndex
                    ? 'ring-2  ring-blue-500'
                    : 'border-gray-200',
                  'relative overflow-hidden p-1 rounded-lg cursor-pointer'
                )}
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={image}
                  alt={`Product Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-cover rounded-lg w-[100px] h-[100px]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main image area */}
        <div className="relative col-span-1 lg:col-span-2 rounded-lg overflow-hidden">
          <div className="overflow-hidden rounded-lg max-h-[500px]">
            <Image
              src={images[mainImageIndex]}
              alt="Product Image"
              width={1400}
              height={1000}
              className="w-full h-full  rounded-lg object-contain"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-between">
            <Button
              onClick={handlePreviousClick}
              variant="ghost"
              size="icon"
              className="ml-7"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={handleNextClick}
              variant="ghost"
              size="icon"
              className="mr-ml-7"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Thumbnails for smaller screens (below lg) */}
        <div className="flex lg:hidden items-center justify-center">
          <div
            className={`grid grid-cols-${
              images.length || 5
            } grid-cols-auto-fit min-w-[100px] gap-5 my-10 mx-2`}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={cn(
                  index === mainImageIndex
                    ? 'ring-2  ring-blue-500'
                    : 'border-gray-200',
                  'relative overflow-hidden p-1 rounded-lg cursor-pointer'
                )}
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={image}
                  alt={`Product Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-cover rounded-lg w-[100px] h-[100px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// For Smaller Screen
{
  /* <div className="grid grid-cols-3 gap-6 md:gap-3 ">
  <div className="flex items-center justify-center">
    <div
      className={`grid grid-rows-${
        images.length || 5
      } grid-cols-auto-fit min-w-[100px] gap-5  mx-2`}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            index === mainImageIndex
              ? 'ring-2  ring-blue-500'
              : 'border-gray-200',
            'relative overflow-hidden p-1  rounded-lg cursor-pointer'
          )}
          onClick={() => handleImageClick(index)}
        >
          <Image
            src={image}
            alt={`Product Thumbnail ${index + 1}`}
            width={100}
            height={100}
            className="object-cover rounded-lg  w-[100px] h-[100px]"
          />
        </div>
      ))}
    </div>
  </div>
  <div className="relative col-span-2 rounded-lg">
    <div className="overflow-hidden rounded-lg">
      <Image
        src={images[mainImageIndex]}
        alt="Product Image"
        width={1400}
        height={1000}
        className="w-full h-[500px] rounded-lg overflow-hidden object-contain"
      />
    </div>
    <div className="absolute inset-0 flex items-center justify-between">
      <Button
        onClick={handlePreviousClick}
        variant="ghost"
        size="icon"
        className="ml-7"
      >
        <ChevronLeft className="w-6 h-6 " />
      </Button>
      <Button
        onClick={handleNextClick}
        variant="ghost"
        size="icon"
        className="mr-ml-7"
      >
        <ChevronRight className="w-6 h-6  " />
      </Button>
    </div>
  </div>
</div>; */
}
