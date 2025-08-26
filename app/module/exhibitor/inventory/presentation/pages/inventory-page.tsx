import { InventoryHeader } from '../atoms';
import { InventoryTable } from '../organisms';

export const InventoryPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <InventoryHeader />
      <InventoryTable />
    </div>
  );
};
