import { ORGANIZER_APP_ROUTES } from '@/app/core/shared/constants/common.const';
import { redirect } from 'next/navigation';

export default function SignupRedirectPage() {
  return redirect(ORGANIZER_APP_ROUTES.auth.login());
}
