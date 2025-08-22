'use client';
import {
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/app/core/shared/components/atoms';
import { useSetParams } from '@/app/core/shared/hooks';
import { OrganizerSettingsPage } from '@/app/core/shared/types/common';
import { useEffect, useState } from 'react';
import { OrganizerSettingsProfile } from '../organisms';

const TABS_ITEMS = [
  {
    value: OrganizerSettingsPage.PROFILE,
    label: 'Personal Profile'
  },
  {
    value: OrganizerSettingsPage.COMPANY,
    label: 'Company'
  },
  {
    value: OrganizerSettingsPage.CHANGE_PASSWORD,
    label: 'Change Password'
  }
];

export const SettingsPage = () => {
  const { searchParamsObject, removeQueryParam } = useSetParams();
  const tab = searchParamsObject?.['tab'];
  const [selectedTab, setSelectedTab] = useState(
    tab ?? OrganizerSettingsPage.PROFILE
  );

  useEffect(() => {
    if (tab) {
      setSelectedTab(tab);
    }
  }, [tab]);

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
    removeQueryParam('tab');
  };

  return (
    <>
      <Tabs value={selectedTab}>
        <TabsList className="flex bg-transparent h-auto md:h-10 px-[1rem] rounded-[6px] gap-x-4 flex-col items-start  md:flex-row gap-y-5">
          {TABS_ITEMS.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="px-[10px] cursor-pointer data-[state=active]:bg-highlight data-[state=active]:text-tertiary rounded-[6px] data-[state=active]:shadow-none"
              onClick={() => handleSelectedTab(item.value)}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <Separator />
        <TabsContent
          value={OrganizerSettingsPage.PROFILE}
          className="p-0 md:px-3 m-0"
        >
          <div className="mt-2">
            <OrganizerSettingsProfile />
          </div>
        </TabsContent>
        <TabsContent
          value={OrganizerSettingsPage.COMPANY}
          className="p-0 md:px-3 m-0"
        >
          <div className="mt-2">2</div>
        </TabsContent>
        <TabsContent
          value={OrganizerSettingsPage.CHANGE_PASSWORD}
          className="p-0 md:px-3 m-0"
        >
          <div className="mt-2">3</div>
        </TabsContent>
      </Tabs>
    </>
  );
};
