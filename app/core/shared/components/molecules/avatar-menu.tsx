'use client';

import { useAuthStore } from '@/module/auth/store';
import { ChevronDown, LogOut, Settings, User, UserCircle } from 'lucide-react';
import { useRouter } from 'nextjs-toploader/app';
import { ORGANIZER_APP_ROUTES } from '../../constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenuButton
} from '../atoms';
interface AvatarMenuProps {
  name: string;
}

export function AvatarMenu({ name }: AvatarMenuProps) {
  const { handleLogOut } = useAuthStore();
  const router = useRouter();

  const handleNavigateToProfile = () => {
    router.push(ORGANIZER_APP_ROUTES.settings());
  };

  const handleNavigateToSettings = () => {
    router.push(ORGANIZER_APP_ROUTES.settings());
  };

  return (
    <>
      <div className="w-42">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border border-input bg-background h-[2.19rem] rounded-[40px] cursor-pointer px-3"
            >
              <div className="flex items-center flex-1 text-left text-sm leading-tight gap-y-1 gap-x-2">
                <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full bg-sidebar-accent">
                  <User size={18} />
                </div>
                <span className="line-clamp-1 font-semibold text-[0.7rem] flex-[0.9]">
                  {name}
                </span>
              </div>
              <div className="w-4 h-4 flex justify-center items-center">
                <ChevronDown className="ml-auto size-4" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-auto w-42 pt-[1rem] pb-[0.5rem] rounded-[0.5rem] text-foreground"
            side="bottom"
            align="end"
            sideOffset={4}
          >
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
              onClick={handleNavigateToSettings}
            >
              <Settings className="text-inherit" />
              Settings
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
      </div>
    </>
  );
}
