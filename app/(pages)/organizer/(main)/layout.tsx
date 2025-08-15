import { AuthProvider } from '@/app/core/providers';
import { SidebarProvider } from '@/app/core/shared/components/atoms';
import { GlobalHeader } from '@/app/core/shared/components/molecules';
import { OrganizerSidebar } from '@/app/core/shared/components/organisms';
import { ORGANIZER_APP_ROUTES } from '@/app/core/shared/constants/common.const';

export default async function OrganizerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // const accessToken = (await cookies()).get(
  //   COOKIE_KEYS.auth.token
  // )?.value;

  //TODO: UNComment
  // if (!accessToken) {
  //   return redirect(ORGANIZER_APP_ROUTES.auth.login());
  // }

  return (
    <AuthProvider signInRoute={ORGANIZER_APP_ROUTES.auth.login()}>
      <SidebarProvider>
        <GlobalHeader
          name="The African Marketplace"
          startDate="2025-08-08"
          endDate="2025-08-10"
        />
        <OrganizerSidebar />
        <main className="w-full pb-[6.25rem] overflow-x-hidden relative top-[var(--organizer-header-height)] px-[1.13rem]">
          <div className="mt-7" />
          {children}
        </main>
      </SidebarProvider>
    </AuthProvider>
  );
}
