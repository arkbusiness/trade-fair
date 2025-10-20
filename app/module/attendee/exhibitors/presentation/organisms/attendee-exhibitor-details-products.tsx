'use client';

import { Spinner } from '@/app/core/shared/components/atoms';
import { useCatalogues } from '../../../catalogues/api';
import { AttendeeProductCard } from '../molecules';
import { useQueryFilters, useSetParams } from '@/app/core/shared/hooks';
import { Pagination } from '@/app/core/shared/components/molecules';

interface AttendeeExhibitorDetailsProductsProps {
  exhibitorId: string;
}

export const AttendeeExhibitorDetailsProducts = ({
  exhibitorId
}: AttendeeExhibitorDetailsProductsProps) => {
  const { filter } = useQueryFilters(['page']);
  const { setMultipleParam, searchParamsObject } = useSetParams();

  const exhibitorQuery = {
    exhibitorId,
    page: searchParamsObject.page ?? '1',
    limit: '15',
    ...filter
  };

  const { catalogues, isLoadingCatalogues, refetchCatalogues, paginationMeta } =
    useCatalogues({
      ...exhibitorQuery
    });

  const handlePageClick = (value: { selected: number }) => {
    const newPage = value.selected + 1;
    const newFilter = {
      ...searchParamsObject,
      page: newPage.toString()
    };
    setMultipleParam(newFilter);
  };

  const hasNextPage = paginationMeta.hasNext;

  return (
    <>
      {isLoadingCatalogues && (
        <div className="mt-7.5">
          <Spinner />
        </div>
      )}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-6 gap-y-15 mt-7.5">
        {catalogues.map((catalogue) => (
          <AttendeeProductCard
            key={catalogue.id}
            product={catalogue}
            handleRefetchExhibitors={refetchCatalogues}
          />
        ))}
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
    </>
  );
};
