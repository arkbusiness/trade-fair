'use client';

import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem
} from '../atoms';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../utils';
import { usePathname } from 'next/navigation';
import { ORGANIZER_SIDEBAR_ITEMS } from '../../constants';

export const OrganizerSidebarItems = () => {
  const pathname = usePathname();

  const isRouteActive = (targetRoute: string, currentPath: string) => {
    if (!targetRoute) return false;
    // 1. Exact match always returns true
    if (currentPath === targetRoute) return true;

    // 2. Special case: If target ends with '/', match all children
    if (targetRoute.endsWith('/')) {
      return currentPath.startsWith(targetRoute);
    }

    // 3. Parent-child matching with strict rules:
    if (currentPath.startsWith(targetRoute + '/')) {
      // Only allow parent-child matching if:
      // - Target is not '/dashboard' (specific exclusion)
      // - OR if you want a more general solution: target has at least one path segment
      return targetRoute !== '/dashboard';
    }

    return false;
  };

  return (
    <div className="w-full flex flex-col gap-7">
      {ORGANIZER_SIDEBAR_ITEMS.map((item: (typeof ORGANIZER_SIDEBAR_ITEMS)[0], index) => {
        const hasChildren = item.routes.length > 0;
        const hasActiveParent = isRouteActive(item.url ?? '', pathname);
        const hasActiveChild = item.routes.some(
          (route: (typeof item.routes)[0]) => isRouteActive(route.url, pathname)
        );

        return (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen={index < 2}
            className="group/collapsible"
          >
            <SidebarGroup
              className={cn('group-data-[collapsible=icon]:hidden m-0 p-0')}
            >
              <SidebarGroupLabel asChild className={'group/label'}>
                <CollapsibleTrigger
                  className={cn(
                    'flex gap-x-[0.63rem] text-text-secondary stroke-foreground py-[7.5px] text-xs font-normal',
                    {
                      'text-sidebar-highlight stroke-sidebar-highlight':
                        hasActiveChild || hasActiveParent,
                      'bg-gray-light-2 !text-tertiary': hasActiveParent
                    }
                  )}
                >
                  {<item.icon className="w-4 h-4" aria-label={item.title} />}
                  {item.url && <Link href={item.url}>{item.title}</Link>}
                  {!item.url && <span>{item.title}</span>}

                  {hasChildren && (
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent
                className={cn({
                  'mt-4': hasChildren
                })}
              >
                <SidebarGroupContent>
                  <SidebarMenu
                    className={cn('px-0rounded-[4px] flex flex-col gap-4')}
                  >
                    {item.routes.map((route: (typeof item.routes)[0]) => {
                      const isActive = isRouteActive(route.url, pathname);

                      return (
                        <SidebarMenuItem key={route.title} className="">
                          <Link
                            href={route.url}
                            className={cn(
                              'flex items-center text-xs font-medium gap-x-[0.63rem] text-text-secondary py-[7.5px] pl-6 rounded-[4px] hover:bg-sidebar-highlight/5 cursor-pointer',
                              {
                                'bg-sidebar-highlight text-background font-bold hover:bg-sidebar-highlight/90':
                                  isActive
                              }
                            )}
                          >
                            <span>{route.title}</span>
                          </Link>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        );
      })}
    </div>
  );
};
