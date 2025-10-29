'use client';

import { AppointmentsCalendar } from '../organisms';
import { AppointmentsList } from '../organisms/appointments-list';

interface AttendeeAppointmentsPageProps {
  exhibitorId: string;
}

export const AttendeeAppointmentsPage = ({
  exhibitorId
}: AttendeeAppointmentsPageProps) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4.5 w-full mt-10.5 max-w-[1200px] mx-auto">
        <AppointmentsCalendar />
        <AppointmentsList exhibitorId={exhibitorId} />
      </div>
    </>
  );
};
