import { Inventory } from '@/app/module/exhibitor/inventory/api/types';
import { create } from 'zustand';

export interface ICartItem extends Inventory {
  cartQuantity: number;
  addedAt: string;
}

interface ICartState {
  items: ICartItem[];
  addToCart: (product: Inventory, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  isInCart: (productId: string) => boolean;
  getCartItem: (productId: string) => ICartItem | undefined;
}

const INITIAL_CART_STATE = {
  items: []
};

export const useCartSlice = create<ICartState>()((set, get) => ({
  ...INITIAL_CART_STATE,
  addToCart: async (product: Inventory, quantity: number) => {
    const currentItems = get().items;
    const existingItemIndex = currentItems.findIndex(
      (item) => item.id === product.id
    );

    let updatedItems: ICartItem[];

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      updatedItems = currentItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, cartQuantity: Math.min(quantity, product.quantity) }
          : item
      );
    } else {
      // Add new item to cart
      const newItem: ICartItem = {
        ...product,
        cartQuantity: Math.min(quantity, product.quantity),
        addedAt: new Date().toISOString()
      };
      updatedItems = [...currentItems, newItem];
    }

    set({ items: updatedItems });
  },

  removeFromCart: async (productId: string) => {
    const currentItems = get().items;
    const updatedItems = currentItems.filter((item) => item.id !== productId);
    set({ items: updatedItems });
  },

  updateQuantity: async (productId: string, quantity: number) => {
    const currentItems = get().items;
    const updatedItems = currentItems.map((item) =>
      item.id === productId
        ? {
            ...item,
            cartQuantity: Math.min(Math.max(1, quantity), item.quantity)
          }
        : item
    );
    set({ items: updatedItems });
  },

  clearCart: async () => {
    set({ items: [] });
  },

  getCartItemCount: () => {
    return get().items.reduce((total, item) => total + item.cartQuantity, 0);
  },

  getCartTotal: () => {
    return get().items.reduce((total, item) => {
      return total + item.basePrice * item.cartQuantity;
    }, 0);
  },

  isInCart: (productId: string) => {
    return get().items.some((item) => item.id === productId);
  },

  getCartItem: (productId: string) => {
    return get().items.find((item) => item.id === productId);
  }
}));
