export enum InventoryStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  SHIPPED = 'SHIPPED',
  INVOICE = 'INVOICE'
}

export interface Inventory {
  id: string;
  exhibitorId: string;
  organizerId: string;
  name: string;
  basePrice: number;
  currency: string;
  sku: string;
  quantity: number;
  description: string;
  images: string[];
  tags: string[] | null;
  availableFrom: string;
  availableTo: string;
  exhibitor: {
    companyName: string;
    contactEmail: string;
  };
  customAttrs:
    | {
        key: string;
        value: string;
      }[]
    | null;
  createdAt: string;
  updatedAt: string;
  productCategoryId: string;
  isFavorite: boolean;
  productCategory: {
    id: string;
    name: string;
  } | null;
}
