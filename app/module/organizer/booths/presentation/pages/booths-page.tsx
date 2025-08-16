import { BoothsHeader } from '../atoms/booths-header';
import { BoothsTable } from '../organisms';

export const BoothsPage = () => {
  return (
    <div className="w-full flex flex-col gap-7.5">
      <BoothsHeader />
      <div>
        <BoothsTable />
      </div>
    </div>
  );
};
