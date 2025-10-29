'use client';

import { Spinner } from '@/app/core/shared/components/atoms';
import {
  OverlaySpinner,
  Pagination
} from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';
import { AttendeeProductCard } from '../../../exhibitors/presentation/molecules';
import { useSearchSlice } from '../../slice/search-slice';
import { EmptyCatalogueState, NoProductsAvailable } from '../atoms';
import { useCatalogueList } from '../../api';

interface CataloguesGridProps {
  exhibitorId: string;
}

export const AllCataloguesGrid = ({ exhibitorId }: CataloguesGridProps) => {
  const { search } = useSearchSlice();
  const { setMultipleParam, searchParamsObject } = useSetParams();

  const {
    catalogues,
    isLoading: isLoadingCatalogues,
    isRefetching: isRefetchingCatalogues,
    paginationMeta
  } = useCatalogueList(exhibitorId, {
    page: searchParamsObject.page || '1',
    exhibitorId,
    search
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
  const hasCatalogues = catalogues.length > 0 && !!exhibitorId;
  const isLoading = isLoadingCatalogues;

  return (
    <div>
      {isLoading && <Spinner />}
      {isRefetchingCatalogues && <OverlaySpinner />}

      {!isLoading &&
        !isRefetchingCatalogues &&
        !hasCatalogues &&
        exhibitorId && <NoProductsAvailable />}

      {!exhibitorId && <EmptyCatalogueState />}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-6 gap-y-8">
        {hasCatalogues &&
          catalogues.map((catalogue, index) => {
            const key = catalogue.id + index;
            return (
              <AttendeeProductCard
                key={key}
                product={catalogue}
                showExhibitor={true}
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
