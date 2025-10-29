'use client';

import { Spinner } from '@/app/core/shared/components/atoms';
import { Pagination } from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';
import { AttendeeProductCard } from '../../../exhibitors/presentation/molecules';
import { useFavouriteCatalogueList } from '../../api/get-favourite-catalogue-list';
import { useSearchSlice } from '../../slice/search-slice';
import { NoProductsAvailable } from '../atoms';

export const FavouriteCataloguesGrid = () => {
  const { search } = useSearchSlice();
  const { setMultipleParam, searchParamsObject } = useSetParams();

  const { catalogues, isLoading, isRefetching, paginationMeta } =
    useFavouriteCatalogueList({
      page: searchParamsObject.page || '1',
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
  const hasCatalogues = catalogues.length > 0;
  const isLoadingCatalogues = isLoading || isRefetching;

  return (
    <div>
      {isLoadingCatalogues && <Spinner />}

      {!isLoadingCatalogues && !hasCatalogues && (
        <NoProductsAvailable
          title="No Favourite Products"
          description="You haven't added any products to your favourites yet."
        />
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-6 gap-y-8">
        {!isLoadingCatalogues &&
          catalogues.map((catalogue) => (
            <AttendeeProductCard
              key={catalogue.id}
              product={catalogue}
              showExhibitor={true}
              hasBeenFavourited={true}
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
  );
};
