'use client';

import { useAuthStore } from '@/module/auth/store';
import { LogOut, MoreVerticalIcon } from 'lucide-react';
import { useUser } from '../../hooks/api';
import { useIsMobile } from '../../hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '../atoms';

interface SidebarUserProps {
  name: string;
  role: string;
}

export function SidebarUser({ name, role }: SidebarUserProps) {
  const { user } = useUser();
  const isMobile = useIsMobile();
  const { handleLogOut } = useAuthStore();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="grid flex-1 text-left text-sm leading-tight gap-y-1">
                <span className="truncate font-semibold text-[0.75rem] text-text-secondary">
                  {name}
                </span>
                <span className="truncate font-normal text-[0.63rem] text-foreground/70">
                  {role}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal max-w-[15rem]">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="grid flex-1 text-left text-sm leading-tight gap-y-1">
                  <span className="line-clamp-1 truncate inline-block font-semibold text-[0.75rem] text-text-secondary">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="truncate inline-block line-clamp-1 font-normal text-[0.63rem] text-foreground/70">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={handleLogOut}
              className="cursor-pointer text-xs text-tertiary stroke-tertiary"
            >
              <LogOut className="rotate-180" color="inherit" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
