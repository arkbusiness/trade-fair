'use client';

import { Package } from 'lucide-react';

interface NoProductsAvailableProps {
  title?: string;
  description?: string;
}
export const NoProductsAvailable = ({
  title,
  description
}: NoProductsAvailableProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-5">
        <Package size={36} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title ? title : 'No Products Available'}
      </h3>
      <p className="opacity-60 text-center max-w-sm leading-relaxed">
        {description
          ? description
          : 'This exhibitor hasn&lsquo;t added any products to their catalogues yet.'}
      </p>
    </div>
  );
};
