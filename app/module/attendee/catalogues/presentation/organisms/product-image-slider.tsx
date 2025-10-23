'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import { Button } from '@/app/core/shared/components/atoms';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCatalogueById } from '../../api';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface ProductImageSliderProps {
  catalogueId: string;
}

export const ProductImageSlider = ({
  catalogueId
}: ProductImageSliderProps) => {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { catalogue } = useCatalogueById(catalogueId);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const images = catalogue?.images || [];
  const productName = catalogue?.name || '';

  return (
    <div className="flex flex-col lg:flex-row gap-4 overflow-hidden">
      {/* Thumbnails */}
      <div className="w-20 lg:w-16 h-20 lg:h-80 order-2 lg:order-1 overflow-hidden flex-shrink-0 relative">
        {/* Scroll indicators */}
        {images.length > 4 && (
          <>
            {/* Mobile horizontal scroll indicator */}
            <div className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 w-6 h-full bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10 flex items-center justify-end pr-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
            </div>

            {/* Desktop vertical scroll indicator */}
            <div className="hidden lg:flex absolute bottom-0 left-1/2 -translate-x-1/2 h-6 w-full bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10 items-end justify-center pb-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
          </>
        )}

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={4}
          direction="horizontal"
          breakpoints={{
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
            <SwiperSlide key={index}>
              <div
                className={`w-12.5 h-12.5 overflow-hidden cursor-pointer transition-colors border-2 ${
                  activeIndex === index
                    ? 'border-tertiary shadow-md'
                    : 'border-transparent hover:border-tertiary'
                }`}
              >
                <img
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Image Swiper */}
      <div className="flex-1 order-1 lg:order-2 overflow-hidden max-w-full relative">
        <Swiper
          spaceBetween={10}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          navigation={{ prevEl, nextEl }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
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
                  className="w-full h-full  object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Previous Button */}
        <Button
          ref={(node) => setPrevEl(node)}
          className="absolute rounded-full z-10 shadow-md left-0 bg-light-blue-2 h-[40px] w-[40px] p-0 top-[calc(50%-17px)] -translate-y-[calc(50%-5px)]"
        >
          <ChevronLeft
            className="text-white pointer-events-none relative z-[1]"
            size={18}
          />
        </Button>

        {/* Next Button */}
        <Button
          ref={(node) => setNextEl(node)}
          className="absolute rounded-full z-10 shadow-md right-0 bg-light-blue-2 h-[40px] w-[40px] p-0 top-[calc(50%-17px)] -translate-y-[calc(50%-5px)]"
        >
          <ChevronRight
            className="text-white pointer-events-none relative z-[1]"
            size={18}
          />
        </Button>
      </div>
    </div>
  );
};
