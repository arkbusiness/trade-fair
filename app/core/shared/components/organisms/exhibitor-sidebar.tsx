'use client';

import { useExhibitorAuthStore } from '@/app/module/auth/store';
import type * as React from 'react';
import { useExhibitorUser } from '../../hooks/api/use-exhibitor-user';
import { Sidebar, SidebarContent, SidebarFooter } from '../atoms';
import { SidebarUser } from '../molecules';
import { ExhibitorSidebarItems } from '../molecules/exhibitor-sidebar-items';

export function ExhibitorSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { handleLogOut } = useExhibitorAuthStore();
  const { user } = useExhibitorUser();

  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="pt-[calc(var(--header-height))] px-[1.12rem] bg-sidebar"
    >
      <SidebarContent className="mt-[2.86rem]">
        <ExhibitorSidebarItems />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser
          companyName={user?.companyName ?? ''}
          username={user?.contactName ?? ''}
          email={user?.contactEmail ?? ''}
          profilePageHref={'#'}
          passwordPageHref={'#'}
          handleLogOut={handleLogOut}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
