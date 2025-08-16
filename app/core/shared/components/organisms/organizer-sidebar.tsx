'use client';
import type * as React from 'react';
import { Sidebar, SidebarContent, SidebarFooter } from '../atoms';
import { OrganizerSidebarItems, SidebarUser } from '../molecules';
import { useOrganizerUser } from '../../hooks/api';
import { useOrganizerAuthStore } from '@/app/module/auth/store';
import { ORGANIZER_APP_ROUTES } from '../../constants';

export function OrganizerSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { handleLogOut } = useOrganizerAuthStore();
  const { user } = useOrganizerUser();
  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="top-[calc(var(--organizer-header-height)+1.75rem)] pb-[calc(var(--organizer-header-height)+1.75rem)] px-[1.12rem] bg-sidebar"
    >
      <SidebarContent className="mt-[2.86rem]">
        <OrganizerSidebarItems />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser
          companyName={user?.companyName ?? ''}
          username={user?.username ?? ''}
          email={user?.officialEmail ?? ''}
          profilePageHref={ORGANIZER_APP_ROUTES.settings()}
          settingPageHref={ORGANIZER_APP_ROUTES.settings()}
          handleLogOut={handleLogOut}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
