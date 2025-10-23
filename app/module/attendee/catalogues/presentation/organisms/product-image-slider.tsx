'use client';

import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { useCatalogueById } from '../../api';
import { ThumbnailSlider, MainImageSlider } from '../molecules';

interface ProductImageSliderProps {
  catalogueId: string;
}

export const ProductImageSlider = ({
  catalogueId
}: ProductImageSliderProps) => {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const { catalogue } = useCatalogueById(catalogueId);

  const images = catalogue?.images || [];
  const productName = catalogue?.name || '';

  const handleSlideChange = (newActiveIndex: number) => {
    setActiveIndex(newActiveIndex);
  };

  const handleSwiperInit = (swiper: SwiperType) => {
    setThumbsSwiper(swiper);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 overflow-hidden">
      <ThumbnailSlider
        images={images}
        productName={productName}
        activeIndex={activeIndex}
        onSwiperInit={handleSwiperInit}
        prevEl={prevEl}
        nextEl={nextEl}
      />

      <MainImageSlider
        images={images}
        productName={productName}
        thumbsSwiper={thumbsSwiper}
        onSlideChange={handleSlideChange}
        onPrevRef={setPrevEl}
        onNextRef={setNextEl}
        prevEl={prevEl}
        nextEl={nextEl}
      />
    </div>
  );
};
