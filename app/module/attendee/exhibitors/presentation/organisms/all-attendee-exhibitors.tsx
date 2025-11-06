'use client';

import { Spinner } from '@/app/core/shared/components/atoms';
import { Pagination } from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';
import { useAttendeeExhibitors } from '../../api';
import { AttendeeExhibitorCard } from '../molecules';

interface AllAttendeeExhibitorsProps {
  filter: Record<string, string>;
}

export const AllAttendeeExhibitors = ({
  filter
}: AllAttendeeExhibitorsProps) => {
  const { setMultipleParam, searchParamsObject } = useSetParams();
  const exhibitorQuery = {
    limit: '15',
    page: searchParamsObject.page || '1',
    search: filter.search || ''
  };
  const { exhibitors, isLoadingExhibitor, paginationMeta } =
    useAttendeeExhibitors(exhibitorQuery);

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
  const showPagination = paginationMeta.pages > 1;
  const hasExhibitors = exhibitors.length > 0;

  return (
    <div>
      {isLoading && <Spinner />}

      {!hasExhibitors && !isLoadingExhibitor && (
        <div className="mt-7.5 flex flex-col items-center justify-center py-12">
          <p className="text-gray-700 text-lg font-medium">
            No exhibitors found
          </p>
        </div>
      )}

      <div className="grid  grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-6 gap-y-15">
        {exhibitors.map((exhibitor) => {
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
            />
          );
        })}
      </div>
      {showPagination && (
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
