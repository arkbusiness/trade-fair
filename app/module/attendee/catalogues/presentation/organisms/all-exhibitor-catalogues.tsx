'use client';

import { useSetParams } from '@/app/core/shared/hooks';
import { CollapsibleSidebar } from '../molecules/collapsible-sidebar';
import { AllCataloguesGrid } from './all-catalogues-grid';

export const AllExhibitorCatalogues = () => {
  const { searchParamsObject } = useSetParams();
  const exhibitorId = searchParamsObject.exhibitorId;

  return (
    <div className="mt-8">
      <div className="grid md:grid-cols-[18.25rem_1fr] grid-cols-1 gap-4">
        <CollapsibleSidebar />
        <AllCataloguesGrid exhibitorId={exhibitorId} />
      </div>
    </div>
  );
};
