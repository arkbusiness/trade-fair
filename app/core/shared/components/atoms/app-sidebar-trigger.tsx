'use client';

import { cn } from '../../utils';
import { useSidebar } from './sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

export function AppSidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        className={cn('cursor-pointer')}
      >
        <svg
          width={19}
          height={19}
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.77637 9.49957C2.77637 6.14082 2.77637 4.46144 3.8198 3.418C4.86323 2.37457 6.54261 2.37457 9.90137 2.37457C13.2601 2.37457 14.9395 2.37457 15.983 3.418C17.0264 4.46144 17.0264 6.14082 17.0264 9.49957C17.0264 12.8583 17.0264 14.5377 15.983 15.5812C14.9395 16.6246 13.2601 16.6246 9.90137 16.6246C6.54261 16.6246 4.86323 16.6246 3.8198 15.5812C2.77637 14.5377 2.77637 12.8583 2.77637 9.49957Z"
            stroke="black"
            strokeWidth="1.5"
          />
          <path
            d="M11.4014 5.74957C11.4014 5.74957 8.40137 8.51137 8.40137 9.49957C8.40136 10.4878 11.4014 13.2496 11.4014 13.2496"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </TooltipTrigger>
      <TooltipContent>
        <span>Toggle sidebar</span>
      </TooltipContent>
    </Tooltip>
  );
}
