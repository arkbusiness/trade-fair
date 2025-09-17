import { redirect } from 'next/navigation';
import { EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants/common.const';

export default function InventoryEditRedirectPage() {
  return redirect(EXHIBITOR_APP_ROUTES.inventory.root());
}
