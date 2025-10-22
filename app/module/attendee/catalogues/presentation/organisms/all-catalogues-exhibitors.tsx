'use client';

import { useSetParams } from '@/app/core/shared/hooks';
import { EmptyCatalogueState, NoProductsAvailable } from '../atoms';
import { AllCataloguesSidebar } from '../molecules';
import { Spinner } from '@/app/core/shared/components/atoms';
import { Pagination } from '@/app/core/shared/components/molecules';
import { useCatalogues } from '../../api';
import { AttendeeProductCard } from '../../../exhibitors/presentation/molecules';

export const AllCataloguesExhibitors = () => {
  const { setMultipleParam, searchParamsObject } = useSetParams();

  const exhibitorId = searchParamsObject.exhibitorId;

  const exhibitorQuery = {
    limit: '15',
    page: searchParamsObject.page || '1',
    exhibitorId
    // ...filter
  };

  const { catalogues, isLoadingCatalogues, refetchCatalogues, paginationMeta } =
    useCatalogues(exhibitorId, exhibitorQuery);

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
    <div className="mt-8 grid grid-cols-[18.25rem_1fr] gap-4">
      <AllCataloguesSidebar />
      <div>
        {isLoadingCatalogues && <Spinner />}

        {!isLoadingCatalogues && !hasCatalogues && exhibitorId && (
          <NoProductsAvailable />
        )}

        {!exhibitorId && <EmptyCatalogueState />}

        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-6 gap-y-15">
          {catalogues.map((catalogue) => (
            <AttendeeProductCard
              key={catalogue.id}
              product={catalogue}
              showExhibitor={true}
              handleRefetchExhibitors={refetchCatalogues}
            />
          ))}
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
    </div>
  );
};
