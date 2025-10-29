'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { errorHandler } from '@/app/core/shared/utils';
import { useAddCatalogueToFavourite } from '../../api/add-catalogue-to-favourite';
import { useRemoveCatalogueToFavourite } from '../../api';

interface FavoriteButtonProps {
  isProductFavorite: boolean;
  productId: string;
}

export const ProductFavoriteButton = ({
  isProductFavorite,
  productId
}: FavoriteButtonProps) => {
  const [isFavorited, setIsFavorited] = useState(isProductFavorite);

  useEffect(() => {
    setIsFavorited(isProductFavorite);
  }, [isProductFavorite]);

  const { addToFavouriteMutation } = useAddCatalogueToFavourite({
    onSuccess: () => {
      toast.success('Product added to favourite');
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
      setIsFavorited(false);
    }
  });

  const { removeFromFavouriteMutation } = useRemoveCatalogueToFavourite({
    onSuccess: () => {
      toast.success('Product removed from favourite');
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      setIsFavorited(false);
      toast.error(errorMessage);
    }
  });

  const handleAddToFavorite = () => {
    setIsFavorited((prev) => !prev);
    addToFavouriteMutation(productId);
  };

  const handleRemoveFromFavorite = () => {
    setIsFavorited((prev) => !prev);
    removeFromFavouriteMutation(productId);
  };

  const handleClickFavourite = () => {
    if (isFavorited) {
      handleRemoveFromFavorite();
    } else {
      handleAddToFavorite();
    }
  };
  return (
    <button
      onClick={handleClickFavourite}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
    >
      <svg
        className={`w-6 h-6 ${isFavorited ? 'text-golden-yellow fill-golden-yellow' : 'text-gray-400'}`}
        fill={isFavorited ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};
