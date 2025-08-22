'use client';

import { ChevronDown, Lock, LogOut, User, UserCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'nextjs-toploader/app';
import { useOrganizerUser } from '../../hooks/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenuButton
} from '../atoms';
interface AvatarMenuProps {
  userName: string;
  handleLogout(): void;
  profilePageHref: string;
  passwordPageHref: string;
}

export function AvatarMenu({
  userName,
  handleLogout,
  profilePageHref,
  passwordPageHref
}: AvatarMenuProps) {
  const { user } = useOrganizerUser();
  const router = useRouter();

  const handleNavigateToProfile = () => {
    router.push(profilePageHref);
  };

  const handleNavigateToPassword = () => {
    router.push(passwordPageHref);
  };

  return (
    <>
      <div className="w-34 sm:w-42">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border border-input bg-background h-[2.19rem] rounded-[40px] cursor-pointer px-3"
            >
              <div className="flex items-center flex-1 text-left text-sm leading-tight gap-y-1 gap-x-2">
                <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full bg-sidebar-accent">
                  {user?.logo ? (
                    <Image
                      src={user.logo}
                      alt="User"
                      width={26}
                      height={26}
                      className="object-contain rounded-full h-full w-full"
                    />
                  ) : (
                    <User size={18} />
                  )}
                </div>
                <span className="line-clamp-1 font-semibold text-[0.7rem] flex-[0.9] hidden sm:inline-block">
                  {userName}
                </span>
                <span className="line-clamp-1 font-semibold text-[0.7rem] flex-[0.9] sm:hidden">
                  {userName}
                </span>
              </div>
              <div className="w-4 h-4 flex justify-center items-center">
                <ChevronDown className="ml-auto size-4" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-auto w-34 sm:w-42 pt-[1rem] pb-[0.5rem] rounded-[0.5rem] text-foreground"
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
              onClick={handleNavigateToPassword}
            >
              <Lock className="text-inherit" />
              Change password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-xs text-tertiary hover:text-tertiary!"
              onClick={handleLogout}
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
