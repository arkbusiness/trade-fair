import {
  COOKIE_KEYS,
  ORGANIZER_APP_ROUTES
} from '@/app/core/shared/constants/common.const';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function OrganizerSigninLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const accessToken = (await cookies()).get(COOKIE_KEYS.auth.token)?.value;

  if (accessToken) {
    return redirect(ORGANIZER_APP_ROUTES.root());
  }

  return <>{children}</>;
}
