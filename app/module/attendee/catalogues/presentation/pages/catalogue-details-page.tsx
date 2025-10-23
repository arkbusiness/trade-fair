'use client';

import { CatalogueDescription, CatalogueDetailsHeader } from '../molecules';
import { ProductImageSlider, ProductDetails } from '../organisms';

interface CatalogueDetailsPageProps {
  catalogueId: string;
}

export const CatalogueDetailsPage = ({
  catalogueId
}: CatalogueDetailsPageProps) => {
  return (
    <>
      <CatalogueDetailsHeader />
      <div className="mt-8.5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-10 max-w-7xl mx-auto px-4 overflow-hidden">
          <ProductImageSlider catalogueId={catalogueId} />
          <ProductDetails catalogueId={catalogueId} />
        </div>
        <div className="my-14">
          <hr />
        </div>
        <CatalogueDescription catalogueId={catalogueId} />
      </div>
    </>
  );
};
