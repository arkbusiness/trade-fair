'use client';

import Image from 'next/image';
import Link from 'next/link';
import type * as React from 'react';
import { useUser } from '../../hooks/api';
import {
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from '../atoms';
import { OrganizerSidebarItems, SidebarUser } from '../molecules';

export function OrganizerSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="pt-[calc(var(--organizer-header-height))] px-[1.12rem] bg-sidebar"
    >
      <SidebarContent className="mt-[2.86rem]">
        <OrganizerSidebarItems />
      </SidebarContent>
      {/* <SidebarFooter>
        <span className="text-[0.75rem] uppercase text-[#3C3CFF] font-semibold mb-[10px]">
          {user?.AdminRole?.[0]?.name ?? ''}
        </span>
        <Separator />
        <SidebarUser
          name={user?.firstName ?? ''}
          role={user?.department ?? ''}
        />
      </SidebarFooter> */}
    </Sidebar>
  );
}
