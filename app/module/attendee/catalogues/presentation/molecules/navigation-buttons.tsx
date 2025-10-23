'use client';

import { Button } from '@/app/core/shared/components/atoms';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  onPrevRef: (node: HTMLButtonElement | null) => void;
  onNextRef: (node: HTMLButtonElement | null) => void;
}

export const NavigationButtons = ({
  onPrevRef,
  onNextRef
}: NavigationButtonsProps) => {
  return (
    <>
      {/* Previous Button */}
      <Button
        ref={(node) => onPrevRef(node)}
        className="absolute rounded-full z-10 shadow-md left-0 bg-light-blue-2 h-[40px] w-[40px] p-0 top-[calc(50%-17px)] -translate-y-[calc(50%-5px)]"
      >
        <ChevronLeft
          className="text-white pointer-events-none relative z-[1]"
          size={18}
        />
      </Button>

      {/* Next Button */}
      <Button
        ref={(node) => onNextRef(node)}
        className="absolute rounded-full z-10 shadow-md right-0 bg-light-blue-2 h-[40px] w-[40px] p-0 top-[calc(50%-17px)] -translate-y-[calc(50%-5px)]"
      >
        <ChevronRight
          className="text-white pointer-events-none relative z-[1]"
          size={18}
        />
      </Button>
    </>
  );
};
