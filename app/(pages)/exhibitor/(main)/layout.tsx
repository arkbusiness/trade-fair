import { ExhibitorAuthProvider } from '@/app/core/providers';
import { SidebarProvider } from '@/app/core/shared/components/atoms';
import {
  ExhibitorGlobalHeader,
  ExhibitorSecondaryHeader
} from '@/app/core/shared/components/molecules';
import { ExhibitorSidebar } from '@/app/core/shared/components/organisms/exhibitor-sidebar';
import {
  COOKIE_KEYS,
  EXHIBITOR_APP_ROUTES
} from '@/app/core/shared/constants/common.const';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
<div className="mt-5" />;
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
    <ExhibitorAuthProvider>
      <SidebarProvider>
        <ExhibitorGlobalHeader />
        <ExhibitorSidebar />
        <main className="w-full pb-[6.25rem] overflow-x-hidden relative top-[var(--header-height)]">
          <ExhibitorSecondaryHeader />
          <div className=" px-[1.13rem] mt-5 z-10 before:bg-sidebar before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:z-[-1]">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </ExhibitorAuthProvider>
  );
}
