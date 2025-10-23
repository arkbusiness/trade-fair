'use client';

import { FavoriteButton } from '../atoms/favorite-button';
import { QuantitySelector } from '../molecules/quantity-selector';

interface ProductDetailsProps {
  title: string;
  exhibitor: {
    name: string;
    link?: string;
  };
  price: number;
  quantity: number;
  isFavorite: boolean;
  onQuantityChange: (quantity: number) => void;
  onFavoriteToggle: () => void;
  onRequestInvoice: () => void;
}

export const ProductDetails = ({
  title,
  exhibitor,
  price,
  quantity,
  isFavorite,
  onQuantityChange,
  onFavoriteToggle,
  onRequestInvoice
}: ProductDetailsProps) => {
  const totalPrice = price * quantity;

  return (
    <div className="flex flex-col gap-6">
      {/* Product Title and Favorite */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Exhibitor:</span>
            <a
              href={exhibitor.link || '#'}
              className="text-blue-500 text-sm hover:underline flex items-center gap-1"
            >
              {exhibitor.name}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
        <FavoriteButton isFavorite={isFavorite} onToggle={onFavoriteToggle} />
      </div>

      {/* Price */}
      <div className="text-3xl font-bold text-gray-900">
        ₦{totalPrice.toLocaleString()}
      </div>

      {/* Quantity Selector */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={onQuantityChange}
      />

      {/* Request Invoice Button */}
      <button
        onClick={onRequestInvoice}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-4 rounded-lg transition-colors"
      >
        REQUEST INVOICE (₦{totalPrice.toLocaleString()})
      </button>
    </div>
  );
};
