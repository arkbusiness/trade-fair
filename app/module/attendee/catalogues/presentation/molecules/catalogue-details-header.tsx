import { GoBackButton } from '@/app/core/shared/components/atoms';
import { ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';

export const CatalogueDetailsHeader = () => {
  return (
    <GoBackButton
      title="Back to Catalogues"
      route={ATTENDEE_APP_ROUTES.catalogues.root()}
    />
  );
};
