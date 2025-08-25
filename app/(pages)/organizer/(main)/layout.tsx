import { OrganizerAuthProvider } from '@/app/core/providers';
import { SidebarProvider } from '@/app/core/shared/components/atoms';
import { OrganizerGlobalHeader } from '@/app/core/shared/components/molecules';
import { OrganizerSidebar } from '@/app/core/shared/components/organisms';
import {
  COOKIE_KEYS,
  ORGANIZER_APP_ROUTES
} from '@/app/core/shared/constants/common.const';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function OrganizerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const accessToken = (await cookies()).get(COOKIE_KEYS.auth.token)?.value;

  if (!accessToken) {
    return redirect(ORGANIZER_APP_ROUTES.auth.login());
  }

  return (
    <OrganizerAuthProvider>
      <SidebarProvider>
        <OrganizerGlobalHeader />
        <OrganizerSidebar />
        <main className="w-full pb-[6.25rem] overflow-x-hidden relative top-[var(--header-height)] px-[1.13rem]">
          <div className="mt-5" />
          {children}
        </main>
      </SidebarProvider>
    </OrganizerAuthProvider>
  );
}
