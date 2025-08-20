import { OrganizerExhibitorHeader } from '../atoms';
import { ExhibitorTable } from '../organisms';

export const ExhibitorsPage = () => {
  return (
    <div className="w-full flex flex-col gap-7.5">
      <OrganizerExhibitorHeader />
      <ExhibitorTable />
    </div>
  );
};
