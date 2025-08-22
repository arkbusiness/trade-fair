import {
  COOKIE_KEYS,
  EXHIBITOR_APP_ROUTES
} from '@/app/core/shared/constants/common.const';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ExhibitorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const accessToken = (await cookies()).get(COOKIE_KEYS.auth.token)?.value;

  if (!accessToken) {
    return redirect(EXHIBITOR_APP_ROUTES.auth.login());
  }

  return (
    // <OrganizerAuthProvider>
    //   <SidebarProvider>
    //     <OrganizerGlobalHeader />
    //     <OrganizerSidebar />
    <main className="w-full pb-[6.25rem] overflow-x-hidden relative top-[var(--organizer-header-height)] px-[1.13rem]">
      <div className="mt-5" />
      {children}
    </main>
    //   </SidebarProvider>
    // </OrganizerAuthProvider>
  );
}
