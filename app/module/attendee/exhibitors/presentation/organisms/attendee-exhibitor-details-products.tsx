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
    limit: '15',
    page: searchParamsObject.page || '1',
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

  const showPagination = paginationMeta.pages > 1;
  const hasCatalogues = catalogues.length > 0;

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

      {!hasCatalogues && !isLoadingCatalogues && (
        <div className="mt-7.5 flex flex-col items-center justify-center py-12">
          <p className="text-gray-700 text-lg font-medium">
            No products available
          </p>
          <p className="text-gray-800 text-sm mt-2">
            This exhibitor hasn&lsquo;t added any products yet.
          </p>
        </div>
      )}

      {showPagination && (
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
