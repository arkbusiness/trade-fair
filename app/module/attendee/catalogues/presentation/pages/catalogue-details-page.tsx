'use client';

import { useState } from 'react';
import { CatalogueDetailsHeader } from '../molecules';
import { ProductImageSlider, ProductDetails } from '../organisms';

interface CatalogueDetailsPageProps {
  catalogueId: string;
}

export const CatalogueDetailsPage = ({
  catalogueId
}: CatalogueDetailsPageProps) => {
  console.log(catalogueId);

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const basePrice = 12528;

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleRequestInvoice = () => {
    // Handle invoice request logic
    console.log('Request invoice for quantity:', quantity);
  };

  return (
    <>
      <CatalogueDetailsHeader />
      <div className="mt-8.5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 overflow-hidden">
          <ProductImageSlider catalogueId={catalogueId} />
          <ProductDetails
            title="Tara eye shadow Primer"
            exhibitor={{
              name: 'House of Tara',
              link: '#'
            }}
            price={basePrice}
            quantity={quantity}
            isFavorite={isFavorite}
            onQuantityChange={handleQuantityChange}
            onFavoriteToggle={handleFavoriteToggle}
            onRequestInvoice={handleRequestInvoice}
          />
        </div>
      </div>
    </>
  );
};
