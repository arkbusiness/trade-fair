import { LinkButton } from '@/app/core/shared/components/atoms';
import { ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';
import { useCatalogueById } from '../../api';

interface CatalogueDescriptionProps {
  catalogueId: string;
}

export const CatalogueDescription = ({
  catalogueId
}: CatalogueDescriptionProps) => {
  const { catalogue } = useCatalogueById(catalogueId);

  const description = catalogue?.description;
  const productName = catalogue?.name;
  const exhibitorId = catalogue?.exhibitorId || '';

  return (
    <div className="max-w-[539px] w-full">
      <div className="flex">
        <span className="font-medium text-foreground">About</span>
        <span className="ml-2 font-medium text-tertiary">{productName}</span>
      </div>
      <div className="mt-4">
        <p className="font-medium">
          {description || 'No description available'}
        </p>
      </div>

      <LinkButton
        href={ATTENDEE_APP_ROUTES.exhibitors.detail(exhibitorId)}
        variant="outline"
        className="mt-4 w-full font-semibold text-sm text-light-blue-2 hover:text-light-blue-2"
      >
        <svg
          width={17}
          height={17}
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.17084 2.36364C2.6063 2.67842 2.04102 3.28007 2.04102 3.28007H13.9953C13.9953 3.28007 13.366 2.67225 12.7197 2.36364C10.0864 1.10638 5.59537 1.01175 3.17084 2.36364Z"
            fill="#0088FF"
          />
          <rect
            x="3.0249"
            y="3.2804"
            width="0.364459"
            height="5.83135"
            fill="#0088FF"
          />
          <rect
            x="12.5737"
            y="3.2804"
            width="0.364459"
            height="5.83135"
            fill="#0088FF"
          />
          <circle cx="7.98166" cy="5.35764" r="1.27561" fill="#0088FF" />
          <ellipse
            cx="7.98178"
            cy="8.92924"
            rx="2.36898"
            ry="2.15031"
            fill="#0088FF"
          />
          <rect
            x="2.66064"
            y="9.11157"
            width="10.6422"
            height="5.53978"
            rx="0.145784"
            fill="#0088FF"
          />
        </svg>
        <span>View Exhibitor</span>
      </LinkButton>
    </div>
  );
};
