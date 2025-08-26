export enum InventoryStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  SHIPPED = 'SHIPPED',
  INVOICE = 'INVOICE'
}

export interface Inventory {
  status: InventoryStatus;
}

export const useInventory = () => {
  return {};
};
