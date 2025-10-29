'use client';

import toast from 'react-hot-toast';
import { useCartSlice } from '../../slice/cart-slice';
import { Inventory } from '@/app/module/exhibitor/inventory/hooks';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/app/core/shared/utils';

interface QuantitySelectorProps {
  product: Inventory | null;
}

export const QuantitySelector = ({ product }: QuantitySelectorProps) => {
  const { updateQuantity, addToCart, isInCart, removeFromCart, getCartItem } =
    useCartSlice();

  const isProductInCart = product ? isInCart(product.id) : false;
  const cartItem = product ? getCartItem(product.id) : undefined;
  const cartQuantity = cartItem ? cartItem.cartQuantity : 0;

  const handleDecrease = () => {
    if (!product) return;
    if (cartQuantity > 0) {
      const newQuantity = cartQuantity - 1;

      if (newQuantity === 0) {
        // Remove from cart when quantity reaches 0
        removeFromCart(product.id);
      } else if (isProductInCart) {
        updateQuantity(product.id, newQuantity);
      }
    }
  };

  const handleIncrease = () => {
    if (!product) return;
    if (cartQuantity < product.quantity) {
      const newQuantity = cartQuantity + 1;
      addToCart(product, newQuantity);
    } else {
      toast.error('Quantity exceeds available stock');
    }
  };

  if (!product) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="font-medium flex mb-3 text-foreground">Select Quantity:</p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleDecrease()}
          disabled={cartQuantity <= 1}
          className={cn(
            'w-11 h-11 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
            {
              'cursor-not-allowed opacity-50': cartQuantity <= 1,
              'bg-gray-light': cartQuantity > 1
            }
          )}
        >
          <Minus size={16} />
        </button>
        <div className="w-11 h-11 text-center flex items-center justify-center">
          <p>{cartQuantity}</p>
        </div>
        <button
          onClick={() => handleIncrease()}
          disabled={cartQuantity >= product.quantity}
          className="w-11 h-11 rounded bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};
