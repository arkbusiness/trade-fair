import { AppointmentsStat } from '../molecules';
import { AppointmentsHeader, AppointmentItems } from '../organisms';

export const AppointmentsPage = () => {
  return (
    <div className="flex flex-col gap-7 mt-7">
      <AppointmentsHeader />
      <div className="bg-background pt-5.5 pb-10 px-6 flex flex-col gap-7">
        <AppointmentsStat />
        <AppointmentItems />
      </div>
    </div>
  );
};
