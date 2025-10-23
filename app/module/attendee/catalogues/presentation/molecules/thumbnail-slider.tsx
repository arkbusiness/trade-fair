'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface ThumbnailSliderProps {
  images: string[];
  productName: string;
  activeIndex: number;
  onSwiperInit: (swiper: SwiperType) => void;
  prevEl: HTMLButtonElement | null;
  nextEl: HTMLButtonElement | null;
}

export const ThumbnailSlider = ({
  images,
  productName,
  activeIndex,
  onSwiperInit,
  prevEl,
  nextEl
}: ThumbnailSliderProps) => {
  return (
    <div className="max-w-[1000px] w-full  lg:w-16 h-20 lg:h-80 order-2 lg:order-1 overflow-hidden flex justify-center flex-shrink-0 relative">
      <Swiper
        onSwiper={onSwiperInit}
        spaceBetween={4}
        slidesPerView={6}
        direction="horizontal"
        breakpoints={{
          0: {
            direction: 'horizontal',
            slidesPerView: 'auto'
          },
          1024: {
            direction: 'vertical',
            slidesPerView: 4
          }
        }}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        navigation={{ prevEl, nextEl }}
        className="thumbs-swiper h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="!w-auto">
            <div
              className={`w-12.5 h-12.5 mx-auto overflow-hidden cursor-pointer transition-colors border-2 ${
                activeIndex === index
                  ? 'border-tertiary shadow-md'
                  : 'border-transparent hover:border-tertiary'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                width={50}
                height={50}
                // quality={50}
                className="w-full h-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
