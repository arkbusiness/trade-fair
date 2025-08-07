'use client';

import { ChevronDown, Lock, UserCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenuButton
} from '../atoms';
import { useRouter } from 'nextjs-toploader/app';
interface AvatarMenuProps {
  name: string;
}

export function AvatarMenu({ name }: AvatarMenuProps) {
  const router = useRouter();
  return (
    <>
      <div className="w-36">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border border-input bg-background h-[2.19rem] rounded-[40px] cursor-pointer px-3"
            >
              <div className="grid flex-1 text-left text-sm leading-tight gap-y-1">
                <span className="truncate font-semibold text-[0.7rem] text-text-secondary">
                  {name}
                </span>
              </div>
              <ChevronDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-auto w-39 py-[1.41rem] rounded-[0.5rem]"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem
              className="cursor-pointer text-xs"
            >
              <UserCircle />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-xs"
            >
              <Lock />
              Change password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
