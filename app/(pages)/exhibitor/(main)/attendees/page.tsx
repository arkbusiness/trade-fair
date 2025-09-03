import { EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants/common.const';
import { redirect } from 'next/navigation';

export default function AttendeesRedirectPage() {
  return redirect(EXHIBITOR_APP_ROUTES.attendees.appointment.root());
}
