'use client';

import { Spinner } from '@/app/core/shared/components/atoms';
import { Pagination } from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';
import { useAttendeeExhibitors } from '../../api';
import { AttendeeExhibitorCard } from '../molecules';

export const AllAttendeeExhibitors = ({
  filter
}: {
  filter: Record<string, string>;
}) => {
  const { setMultipleParam, searchParamsObject } = useSetParams();
  const exhibitorQuery = {
    page: searchParamsObject.page ?? '1',
    limit: '15',
    ...filter
  };
  const { exhibitors, isLoadingExhibitor, paginationMeta, refetchExhibitor } =
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

  return (
    <div>
      {isLoading && <Spinner />}
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
              handleRefetchExhibitors={refetchExhibitor}
            />
          );
        })}
      </div>
      <div className="flex justify-center mt-10">
        <Pagination
          page={paginationMeta.page}
          pageCount={paginationMeta.pages}
          handlePageClick={handlePageClick}
        />
      </div>
    </div>
  );
};
