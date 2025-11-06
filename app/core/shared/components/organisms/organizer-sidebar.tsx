'use client';
import type * as React from 'react';
import { Sidebar, SidebarContent, SidebarFooter } from '../atoms';
import { OrganizerSidebarItems, SidebarUser } from '../molecules';
import { useOrganizerUser } from '../../api';
import { useOrganizerAuthStore } from '@/app/module/auth/store';
import { ORGANIZER_APP_ROUTES } from '../../constants';
import { OrganizerSettingsPage } from '../../types';

export function OrganizerSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { handleLogOut } = useOrganizerAuthStore();
  const { user } = useOrganizerUser();
  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="top-[calc(var(--header-height)+1.75rem)] pb-[calc(var(--header-height)+1.75rem)] px-[1.12rem] bg-sidebar"
    >
      <SidebarContent className="mt-[2.86rem]">
        <OrganizerSidebarItems />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser
          companyName={user?.companyName ?? ''}
          username={user?.username ?? ''}
          email={user?.officialEmail ?? ''}
          profilePageHref={ORGANIZER_APP_ROUTES.settings(
            OrganizerSettingsPage.PROFILE
          )}
          passwordPageHref={ORGANIZER_APP_ROUTES.settings(
            OrganizerSettingsPage.CHANGE_PASSWORD
          )}
          handleLogOut={handleLogOut}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
