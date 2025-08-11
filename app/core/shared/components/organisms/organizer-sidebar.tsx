'use client';
import type * as React from 'react';
import { useUser } from '../../hooks/api';
import { Sidebar, SidebarContent, SidebarFooter } from '../atoms';
import { OrganizerSidebarItems, SidebarUser } from '../molecules';

export function OrganizerSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  console.log(user);

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
        <SidebarUser name="Ade Johnson" email="example@example.com" />
      </SidebarFooter>
    </Sidebar>
  );
}
