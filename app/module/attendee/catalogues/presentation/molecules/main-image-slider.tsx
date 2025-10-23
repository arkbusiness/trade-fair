'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import { NavigationButtons } from './navigation-buttons';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface MainImageSliderProps {
  images: string[];
  productName: string;
  thumbsSwiper: SwiperType | null;
  onSlideChange: (activeIndex: number) => void;
  onPrevRef: (node: HTMLButtonElement | null) => void;
  onNextRef: (node: HTMLButtonElement | null) => void;
  prevEl: HTMLButtonElement | null;
  nextEl: HTMLButtonElement | null;
}

export const MainImageSlider = ({
  images,
  productName,
  thumbsSwiper,
  onSlideChange,
  onPrevRef,
  onNextRef,
  prevEl,
  nextEl
}: MainImageSliderProps) => {
  return (
    <div className="flex-1 order-1 lg:order-2 overflow-hidden max-w-full relative">
      <Swiper
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        navigation={{ prevEl, nextEl }}
        onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
        className="main-swiper w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="aspect-square overflow-hidden relative w-[28.13rem] h-[28.13rem] flex items-center justify-center mx-auto">
              <Image
                src={image}
                alt={productName}
                width={450}
                height={450}
                className="w-full h-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <NavigationButtons onPrevRef={onPrevRef} onNextRef={onNextRef} />
    </div>
  );
};
