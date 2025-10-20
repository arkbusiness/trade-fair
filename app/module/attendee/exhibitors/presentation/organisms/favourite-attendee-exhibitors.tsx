'use client';

import { Spinner } from '@/app/core/shared/components/atoms';
import { Pagination } from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';
import { useAttendeeFavouriteExhibitors } from '../../api';
import { AttendeeExhibitorCard } from '../molecules';
import { useEffect } from 'react';

export const FavouriteAttendeeExhibitors = ({
  filter
}: {
  filter: Record<string, string>;
}) => {
  const { setMultipleParam, searchParamsObject } = useSetParams();
  const exhibitorQuery = {
    limit: '15',
    search: filter.search || ''
  };
  const {
    exhibitors,
    isLoadingExhibitor,
    isRefetchingExhibitor,
    paginationMeta,
    refetchExhibitor
  } = useAttendeeFavouriteExhibitors(exhibitorQuery);

  useEffect(() => {
    refetchExhibitor();
  }, []);

  const handlePageClick = (value: { selected: number }) => {
    const newPage = value.selected + 1;
    const newFilter = {
      ...searchParamsObject,
      page: newPage.toString()
    };
    setMultipleParam(newFilter);
    window?.scrollTo({ top: 20, behavior: 'smooth' });
  };

  const isLoading = isLoadingExhibitor;
  const isFetching = isRefetchingExhibitor || isLoading;
  const hasNextPage = paginationMeta.hasNext;

  const hasExhibitors = exhibitors.length > 0;

  return (
    <div>
      {isFetching && <Spinner />}
      {!hasExhibitors && !isFetching && (
        <div className="mt-7.5 flex flex-col items-center justify-center py-12">
          <p className="text-gray-700 text-lg font-medium">
            No exhibitors found
          </p>
        </div>
      )}

      <div className="grid  grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-6 gap-y-15">
        {!isFetching &&
          exhibitors.map((exhibitor) => {
            const isLiked = exhibitor.isFavorite;
            return (
              <AttendeeExhibitorCard
                key={exhibitor.id}
                exhibitorId={exhibitor.id}
                imageUrl={exhibitor.logoUrl || './images/empty-image.svg'}
                companyName={exhibitor.companyName}
                boothNumber={exhibitor.boothNumber}
                description={exhibitor.publicDescription}
                isLiked={isLiked}
                allowNavigation={true}
                showFavouriteButton={false}
                handleRefetchExhibitors={refetchExhibitor}
              />
            );
          })}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-10">
          <Pagination
            page={paginationMeta.page}
            pageCount={paginationMeta.pages}
            handlePageClick={handlePageClick}
          />
        </div>
      )}
    </div>
  );
};
