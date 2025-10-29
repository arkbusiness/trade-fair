'use client';

import { SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type * as React from 'react';
import { ATTENDEE_APP_ROUTES } from '../../constants';
import { cn } from '../../utils';
import { Sidebar, SidebarContent, SidebarFooter } from '../atoms';
import { AttendeeSidebarItems } from '../molecules';

export function AttendeeSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const isSettingsActive = pathname.includes(ATTENDEE_APP_ROUTES.settings());

  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="px-[1.12rem] bg-sidebar"
    >
      <SidebarContent className="mt-[1.2rem]">
        <AttendeeSidebarItems />
      </SidebarContent>
      <SidebarFooter>
        <div>
          <Link href={ATTENDEE_APP_ROUTES.settings()}>
            <span
              className={cn(
                'flex items-center text-xs font-medium gap-x-[0.63rem] text-foreground py-[7.5px] pl-2 rounded-[4px] hover:bg-gray-light-2 cursor-pointer opacity-70',
                {
                  'bg-gray-light-2 text-tertiary font-bold hover:bg-gray-light opacity-100':
                    isSettingsActive
                }
              )}
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Settings</span>
            </span>
          </Link>
        </div>
        {/* <SidebarUser
          companyName={user?.companyName ?? ''}
          username={user?.contactName ?? ''}
          email={user?.contactEmail ?? ''}
          profilePageHref={'#'}
          passwordPageHref={'#'}
          handleLogOut={handleLogOut}
        /> */}
      </SidebarFooter>
    </Sidebar>
  );
}
