'use client';

import Image from 'next/image';
import { useOrganizerExhibitorById } from '../../hooks';
import { ImagePlaceholder } from '@/app/core/shared/components/atoms/image-placeholder';

export const ExhibitorDetailHero = ({ id }: { id: string }) => {
  const { exhibitor } = useOrganizerExhibitorById(id);

  const hasBeenAssigned = !!exhibitor?.boothNumber;
  const hasLogo = !!exhibitor?.logo;

  return (
    <div className="relative">
      <div className="w-full h-[128px] bg-gradient-to-r from-light-blue to-dark-blue" />

      <div className="flex justify-between sm:px-7 gap--x-8 flex-wrap mt-2 sm:mt-0">
        <div className="flex gap-2 flex-col sm:flex-row max-w-[363px] w-full">
          <div className="w-[100px] h-[100px] overflow-hidden rounded-[12px] sm:relative -top-6">
            {hasLogo ? (
              <Image
                src={exhibitor?.logo as string}
                alt={exhibitor?.exhibitorCompanyName ?? 'Exhibitor Logo'}
                width={100}
                height={100}
                className="object-cover  w-full h-full"
              />
            ) : (
              <ImagePlaceholder label="Logo" />
            )}
          </div>
          <div className="text-left mt-1 max-w-[250px] w-full">
            <p className="text-lg font-bold text-foreground">
              {exhibitor?.exhibitorCompanyName ?? 'N/A'}
            </p>
            <p className="text-sm font-light break-all whitespace-pre-wrap">
              {exhibitor?.email}
            </p>
          </div>
        </div>

        <div className="w-[130px] h-[42px] flex items-center justify-center rounded-[20px] border border-light-blue-2 mt-2">
          <span className="text-light-blue-2 font-semibold text-sm">
            BOOTH {hasBeenAssigned ? exhibitor?.boothNumber : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};
