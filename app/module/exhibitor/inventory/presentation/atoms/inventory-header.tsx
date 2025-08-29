'use client';

import { LinkButton } from '@/app/core/shared/components/atoms';
import { DashboardToolbar } from '@/app/core/shared/components/molecules';
import { ExportButton } from '@/app/core/shared/components/organisms/export-button';
import { EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants';
import { Plus } from 'lucide-react';
import { inventoryService } from '../../services/inventory.service';
import { ImportProductForm } from '../organisms';
import { getQueryClient } from '@/app/core/shared/lib';

export const InventoryHeader = () => {
  const queryClient = getQueryClient();

  const closeModal = () => {
    queryClient.invalidateQueries({
      queryKey: [...inventoryService.getProducts().queryKey]
    });
  };

  return (
    <>
      <DashboardToolbar title="" description="" showTitle={false}>
        <div className="flex items-center gap-x-[7px]">
          <ImportProductForm
            onSuccess={closeModal}
            sampleFileUrl="/csv-sample/product-sample.csv"
          />
          <ExportButton
            apiRoute="/exhibitor/products/export"
            exportName="product"
          />

          <LinkButton
            variant="tertiary"
            className="flex gap-x-[0.63rem]"
            href={EXHIBITOR_APP_ROUTES.inventory.add()}
          >
            <Plus size={16} />
            <span>Add Inventory</span>
          </LinkButton>
        </div>
      </DashboardToolbar>
    </>
  );
};
