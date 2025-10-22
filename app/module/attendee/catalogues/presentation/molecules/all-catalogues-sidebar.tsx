'use client';

import { Spinner } from '@/app/core/shared/components/atoms';
import { useSetParams } from '@/app/core/shared/hooks';
import { cn } from '@/app/core/shared/utils';
import Image from 'next/image';
import { useMemo } from 'react';
import { useAttendeeExhibitors } from '../../../exhibitors/api';
import { groupExhibitorsByLetter } from '../../utils';

export const AllCataloguesSidebar = () => {
  const { searchParamsObject, setMultipleParam } = useSetParams();
  const selectedExhibitorId = searchParamsObject.exhibitorId;

  const exhibitorQuery = {
    limit: '1000'
  };
  const { exhibitors, isLoadingExhibitor } =
    useAttendeeExhibitors(exhibitorQuery);

  // Group exhibitors by first letter using utility function
  const groupedExhibitors = useMemo(() => {
    return groupExhibitorsByLetter(exhibitors);
  }, [exhibitors]);

  const handleExhibitorClick = (exhibitorId: string) => {
    setMultipleParam({
      exhibitorId,
      page: '1'
    });
  };

  const hasExhibitors = exhibitors.length > 0;

  return (
    <div className="border rounded-[0.75rem] p-4.5">
      <p className="text-sm font-semibold">Select Exhibitor</p>
      <div className="mt-4 space-y-6 overflow-y-auto h-[650px]">
        {isLoadingExhibitor && <Spinner />}
        {!isLoadingExhibitor && !hasExhibitors && (
          <div className="mt-7.5 flex flex-col items-center justify-center py-12">
            <p className="text-gray-700 text-lg font-medium">
              No exhibitors found
            </p>
          </div>
        )}
        {groupedExhibitors.map((group) => (
          <div key={group.letter}>
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              {group.letter}
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(65px,1fr))] gap-3 pr-1">
              {group.exhibitors.map((exhibitor) => (
                <button
                  key={exhibitor.id}
                  className={cn(
                    'flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer',
                    {
                      'scale-105': selectedExhibitorId === exhibitor.id
                    }
                  )}
                  onClick={() => handleExhibitorClick(exhibitor.id)}
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full overflow-hidden mb-2 flex items-center justify-center bg-gray-100',
                      {
                        'border-2 border-tertiary':
                          selectedExhibitorId === exhibitor.id
                      }
                    )}
                  >
                    <Image
                      src={exhibitor.logoUrl || '/images/empty-image.svg'}
                      alt={exhibitor.companyName}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <span
                    className={cn(
                      'text-xs text-center font-medium text-gray-700 leading-tight break-words',
                      {
                        'text-tertiary font-semibold':
                          selectedExhibitorId === exhibitor.id
                      }
                    )}
                  >
                    {exhibitor.companyName}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
