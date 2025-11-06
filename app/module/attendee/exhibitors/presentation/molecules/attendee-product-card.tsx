'use client';

import { Card, CardContent } from '@/app/core/shared/components/atoms';
import { ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';
import { cn, errorHandler, formatCurrency } from '@/app/core/shared/utils';
import { ChevronRight, Heart } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useRouter } from 'nextjs-toploader/app';

import { Inventory } from '@/app/module/exhibitor/inventory/api/types';
import {
  useAddCatalogueToFavourite,
  useRemoveCatalogueToFavourite
} from '../../../catalogues/api';

type AttendeeProductCardProps = {
  product: Inventory;
  showExhibitor?: boolean;
  showFavouriteButton?: boolean;
  hasBeenFavourited?: boolean;
};

export const AttendeeProductCard = ({
  product,
  showExhibitor = false,
  showFavouriteButton = true,
  hasBeenFavourited = false
}: AttendeeProductCardProps) => {
  const router = useRouter();

  const isProductFavourited = product?.isFavorite || hasBeenFavourited || false;
  const [isLikedState, setIsLikedState] = useState(false);

  useEffect(() => {
    setIsLikedState(isProductFavourited);
  }, [isProductFavourited]);

  const { addToFavouriteMutation, isLoading: isAddToFavouriteLoading } =
    useAddCatalogueToFavourite({
      onSuccess: () => {
        toast.success('Product added to favourite');
      },
      onError: (error: unknown) => {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
        setIsLikedState(false);
      }
    });

  const {
    removeFromFavouriteMutation,
    isLoading: isRemoveFromFavouriteLoading
  } = useRemoveCatalogueToFavourite({
    onSuccess: () => {
      toast.success('Product removed from favourite');
    },
    onError: (error: unknown) => {
      const errorMessage = errorHandler(error);
      setIsLikedState(false);
      toast.error(errorMessage);
    }
  });

  const handleAddToFavorite = () => {
    setIsLikedState((prev) => !prev);
    addToFavouriteMutation(product.id);
  };

  const handleRemoveFromFavorite = () => {
    setIsLikedState((prev) => !prev);
    removeFromFavouriteMutation(product.id);
  };

  const handleClickFavourite = () => {
    if (isLikedState) {
      handleRemoveFromFavorite();
    } else {
      handleAddToFavorite();
    }
  };

  const handleGoToProduct = (productId: string) => {
    router.push(ATTENDEE_APP_ROUTES.catalogues.detail(productId));
  };

  const handleGoToExhibitor = () => {
    router.push(ATTENDEE_APP_ROUTES.exhibitors.detail(product.exhibitorId));
  };

  const isMutating = isAddToFavouriteLoading || isRemoveFromFavouriteLoading;
  const isFavourited = (isProductFavourited && !isMutating) || isLikedState;
  const exhibitorName = product?.exhibitor?.companyName;

  return (
    <Card
      className="pt-0 cursor-pointer"
      onClick={() => handleGoToProduct(product.id)}
    >
      <div className="max-h-[13.5rem] overflow-hidden h-full py-0">
        <Image
          src={product.images?.[0] || './images/empty-image.svg'}
          alt={product.name}
          width={240}
          height={135}
          className="object-contain h-full w-full"
        />
      </div>
      <CardContent>
        <div className="mt-3  flex flex-col gap-3 px-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold line-clamp-2">
                {product.name}
              </h3>
            </div>
          </div>

          {!showExhibitor && (
            <p className="text-xs font-medium line-clamp-2 opacity-60">
              {product.description || 'N/A'}
            </p>
          )}

          {showExhibitor && exhibitorName && (
            <button
              className="flex justify-between items-center"
              onClick={(event) => {
                event.stopPropagation();
                handleGoToExhibitor();
              }}
            >
              <span className="font-medium line-clamp-2 text-light-blue-2">
                {exhibitorName}
              </span>
              <ChevronRight size={16} className="text-light-blue-2" />
            </button>
          )}

          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg">
              {formatCurrency({
                amount: product.basePrice,
                currency: product.currency
              })}
            </p>

            {showFavouriteButton && (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleClickFavourite();
                }}
                disabled={isMutating}
                className="relative z-10 h-10 w-10 flex items-center justify-center"
              >
                <Heart
                  size={16}
                  className={cn({
                    'text-golden-yellow fill-golden-yellow': isFavourited
                  })}
                />
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
