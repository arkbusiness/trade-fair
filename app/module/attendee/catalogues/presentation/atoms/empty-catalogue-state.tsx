'use client';

import { ShoppingBag } from 'lucide-react';

export const EmptyCatalogueState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <ShoppingBag size={40} />
      </div>
      <h2 className="text-lg font-semibold mb-3">Catalogues</h2>
      <p className="opacity-60 text-center max-w-md">
        Select an exhibitor at the left to view and browse their catalogues.
      </p>
    </div>
  );
};
