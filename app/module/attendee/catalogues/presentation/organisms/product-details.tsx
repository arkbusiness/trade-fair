'use client';

import {
  ATTENDEE_APP_ROUTES,
  DEFAULT_CURRENCY
} from '@/app/core/shared/constants';
import { formatCurrency } from '@/app/core/shared/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useCatalogueById } from '../../api';
import { ProductFavoriteButton } from '../atoms/product-favorite-button';
import { QuantitySelector } from '../molecules/quantity-selector';
import { RequestInvoiceButton } from '../molecules/request-invoice-button';

interface ProductDetailsProps {
  catalogueId: string;
}

export const ProductDetails = ({ catalogueId }: ProductDetailsProps) => {
  const { catalogue, refetchCatalogue } = useCatalogueById(catalogueId);
  const exhibitor = catalogue?.exhibitor;
  const exhibitorId = catalogue?.exhibitorId;
  const isFavorited = catalogue?.isFavorite || false;

  const currency = catalogue?.currency || DEFAULT_CURRENCY;
  const basePrice = catalogue?.basePrice || 0;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Product Title and Favorite */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold  mb-2 text-foreground">
            {catalogue?.name}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground">Exhibitor:</span>

            {exhibitor && exhibitorId && (
              <Link href={ATTENDEE_APP_ROUTES.exhibitors.detail(exhibitorId)}>
                <span className="flex justify-between items-center gap-4">
                  <span className="font-medium line-clamp-2 text-light-blue-2">
                    {exhibitor.companyName}
                  </span>
                  <ChevronRight size={16} className="text-light-blue-2" />
                </span>
              </Link>
            )}
          </div>
        </div>
        <ProductFavoriteButton
          isProductFavorite={isFavorited}
          productId={catalogueId}
          handleRefetch={refetchCatalogue}
        />
      </div>

      {/* Price */}
      <p className="text-xl font-bold text-foreground">
        {formatCurrency({
          amount: basePrice,
          currency: currency
        })}
      </p>

      {/* Quantity Selector */}
      <QuantitySelector product={catalogue || null} />

      <div className="mt-15 border lg:max-w-[391px]">
        <RequestInvoiceButton
          productId={catalogueId}
          currency={currency}
          className="w-full"
        />
      </div>
    </div>
  );
};
