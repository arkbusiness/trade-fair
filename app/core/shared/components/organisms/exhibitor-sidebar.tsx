'use client';

import { SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type * as React from 'react';
import { EXHIBITOR_APP_ROUTES } from '../../constants';
import { cn } from '../../utils';
import { Sidebar, SidebarContent, SidebarFooter } from '../atoms';
import { ExhibitorSidebarItems } from '../molecules/exhibitor-sidebar-items';
import { ExhibitorSettingsPageEnum } from '../../types';

export function ExhibitorSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const isSettingsActive = pathname.includes(EXHIBITOR_APP_ROUTES.settings());
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
        <div>
          <Link
            href={EXHIBITOR_APP_ROUTES.settings(
              ExhibitorSettingsPageEnum.BUSINESS_INFORMATION
            )}
          >
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
