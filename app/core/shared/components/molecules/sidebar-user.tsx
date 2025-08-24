'use client';

import { Lock, LogOut, MoreVerticalIcon, UserCircle } from 'lucide-react';
import { useRouter } from 'nextjs-toploader/app';
import { useIsMobile } from '../../hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '../atoms';

interface SidebarUserProps {
  companyName: string;
  username: string;
  email: string;
  profilePageHref: string;
  passwordPageHref: string;
  handleLogOut: () => void;
}

export function SidebarUser({
  companyName,
  username,
  email,
  profilePageHref,
  passwordPageHref,
  handleLogOut
}: SidebarUserProps) {
  const isMobile = useIsMobile();
  const router = useRouter();

  const handleNavigateToProfile = () => {
    router.push(profilePageHref);
  };

  const handleNavigateToPassword = () => {
    router.push(passwordPageHref);
  };

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
                  {companyName}
                </span>
                <span className="truncate font-normal text-[0.63rem] text-foreground/70">
                  {email}
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
                    {username}
                  </span>
                  <span className="truncate inline-block line-clamp-1 font-normal text-[0.63rem] text-foreground/70">
                    {email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer text-xs hover:bg-highlight! hover:border-tertiary! hover:border-1!"
              onClick={handleNavigateToProfile}
            >
              <UserCircle className="text-inherit" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-xs hover:bg-highlight! hover:border-tertiary! hover:border-1!"
              onClick={handleNavigateToPassword}
            >
              <Lock className="text-inherit" />
              Change password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-xs text-tertiary hover:text-tertiary!"
              onClick={handleLogOut}
            >
              <LogOut className="text-inherit" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
