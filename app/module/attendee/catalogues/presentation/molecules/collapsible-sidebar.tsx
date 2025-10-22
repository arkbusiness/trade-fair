'use client';

import { cn } from '@/app/core/shared/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { AllCataloguesSidebar } from './all-catalogues-sidebar';

export const CollapsibleSidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <span className="text-sm font-semibold">Select Exhibitor</span>
          {isSidebarCollapsed ? (
            <ChevronDown size={20} className="text-gray-600" />
          ) : (
            <ChevronUp size={20} className="text-gray-600" />
          )}
        </button>

        {/* Collapsible sidebar content on mobile */}
        <div
          className={cn('transition-all duration-300 ease-in-out', {
            'max-h-0 overflow-hidden': isSidebarCollapsed,
            'max-h-[500px] mt-4 overflow-y-auto': !isSidebarCollapsed
          })}
        >
          <AllCataloguesSidebar />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <AllCataloguesSidebar />
      </div>
    </>
  );
};
