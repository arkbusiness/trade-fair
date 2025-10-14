'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ATTENDEE_SIDEBAR_ITEMS } from '../../constants';
import { cn } from '../../utils';
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

export const AttendeeSidebarItems = () => {
  const pathname = usePathname();

  const isRouteActive = (targetRoute: string, currentPath: string) => {
    if (!targetRoute) return false;
    // 1. Exact match always returns true
    if (currentPath === targetRoute) return true;

    // 3. Parent-child matching with strict rules:
    if (currentPath.startsWith(targetRoute + '/')) {
      // Only allow parent-child matching if:
      // - Target is not '/attendee' (specific exclusion)
      // - OR if you want a more general solution: target has at least one path segment
      return targetRoute !== '/attendee';
    }

    return false;
  };

  return (
    <div className="w-full flex flex-col gap-7">
      {ATTENDEE_SIDEBAR_ITEMS.map(
        (item: (typeof ATTENDEE_SIDEBAR_ITEMS)[0], index: number) => {
          const hasChildren = item.routes.length > 0;
          const hasActiveParent = isRouteActive(item.url ?? '', pathname);
          const hasActiveChild = item.routes.some(
            (route: (typeof item.routes)[0]) =>
              isRouteActive(route.url, pathname)
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
                      'flex gap-x-[0.63rem] text-foreground stroke-foreground py-[7.5px] text-xs font-medium cursor-pointer px-3',
                      {
                        'text-sidebar-highlight stroke-sidebar-highlight':
                          hasActiveChild || hasActiveParent,
                        'hover:bg-highlight hover:text-tertiary!': !!item.url,
                        'bg-tertiary !text-background': hasActiveParent
                      }
                    )}
                  >
                    {item.icon && (
                      <item.icon className="w-4 h-4" aria-label={item.title} />
                    )}
                    {item.url && <Link href={item.url}>{item.title}</Link>}
                    {!item.url && (
                      <span className="text-foreground">{item.title}</span>
                    )}

                    {hasChildren && (
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90 text-foreground" />
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
                                'flex items-center text-xs font-medium gap-x-[0.63rem] text-text-secondary py-[7.5px] pl-6 rounded-[4px] hover:bg-gray-light-2 cursor-pointer opacity-70',
                                {
                                  'bg-gray-light-2 text-tertiary font-bold hover:bg-gray-light opacity-100':
                                    isActive
                                }
                              )}
                            >
                              {route.icon && (
                                <route.icon
                                  className="w-4 h-4"
                                  aria-label={route.title}
                                />
                              )}
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
        }
      )}
    </div>
  );
};
