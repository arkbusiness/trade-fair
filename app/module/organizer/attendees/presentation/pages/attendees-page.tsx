import { OrganizerAttendeesHeader } from '../atoms';
import { AttendeesTable } from '../organisms';

export const AttendeesPage = () => {
  return (
    <div className="w-full flex flex-col gap-7.5">
      <OrganizerAttendeesHeader />
      <AttendeesTable />
    </div>
  );
};
