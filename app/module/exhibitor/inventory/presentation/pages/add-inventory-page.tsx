import { GoBackButton } from '@/app/core/shared/components/atoms';
import { EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants';
import { InventoryForm } from '../organisms';

export const AddInventoryPage = () => {
  return (
    <div className="flex flex-col gap-3.5">
      <GoBackButton
        route={EXHIBITOR_APP_ROUTES.inventory.root()}
        title="Back to Inventory"
      />
      <InventoryForm />
    </div>
  );
};
