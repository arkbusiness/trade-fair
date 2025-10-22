'use client';

import { Spinner } from '@/app/core/shared/components/atoms';
import { Pagination } from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';
import { AttendeeProductCard } from '../../../exhibitors/presentation/molecules';
import { useFavoriteCatalogues } from '../../api';
import { useSearchSlice } from '../../slice/search-slice';
import { NoProductsAvailable } from '../atoms';
import { useEffect } from 'react';

export const FavouriteCataloguesGrid = () => {
  const { search } = useSearchSlice();
  const { setMultipleParam, searchParamsObject } = useSetParams();

  const favouriteCataloguesQuery = {
    page: searchParamsObject.page || '1',
    search
  };

  const {
    favoriteCatalogues,
    isRefetchingFavoriteCatalogues,
    isLoadingFavoriteCatalogues,
    refetchFavoriteCatalogues,
    paginationMeta
  } = useFavoriteCatalogues(favouriteCataloguesQuery);

  useEffect(() => {
    refetchFavoriteCatalogues();
  }, [refetchFavoriteCatalogues]);

  const handlePageClick = (value: { selected: number }) => {
    const newPage = value.selected + 1;
    const newFilter = {
      ...searchParamsObject,
      page: newPage.toString()
    };
    setMultipleParam(newFilter);
  };

  const showPagination = paginationMeta.pages > 1;
  const hasCatalogues = favoriteCatalogues.length > 0;
  const isLoading =
    isLoadingFavoriteCatalogues || isRefetchingFavoriteCatalogues;

  return (
    <div>
      {isLoading && <Spinner />}

      {!isLoading && !hasCatalogues && (
        <NoProductsAvailable
          title="No Favourite Products"
          description="You haven't added any products to your favourites yet."
        />
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-6 gap-y-8">
        {!isLoading &&
          favoriteCatalogues.map((catalogue) => (
            <AttendeeProductCard
              key={catalogue.id}
              product={catalogue}
              showExhibitor={true}
              hasBeenFavourited={true}
              handleRefetchExhibitors={refetchFavoriteCatalogues}
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
