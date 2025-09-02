'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/app/core/shared/components/atoms';
import { useSetParams } from '@/app/core/shared/hooks';
import { ExhibitorSettingsPageEnum } from '@/app/core/shared/types';
import { useEffect, useState } from 'react';
import {
  ExhibitorBoothMembers,
  ExhibitorBusinessInfoForm,
  ExhibitorChangePasswordForm,
  ExhibitorProfileForm
} from '../organisms';

const TABS_ITEMS = [
  {
    value: ExhibitorSettingsPageEnum.BUSINESS_INFORMATION,
    label: 'Business Information'
  },
  {
    value: ExhibitorSettingsPageEnum.MY_PROFILE,
    label: 'My Profile'
  },
  {
    value: ExhibitorSettingsPageEnum.CHANGE_PASSWORD,
    label: 'Change Password'
  },
  {
    value: ExhibitorSettingsPageEnum.BOOTH_MEMBERS,
    label: 'Booth Members'
  },
  {
    value: ExhibitorSettingsPageEnum.INVOICE_INFORMATION,
    label: 'Invoice Information'
  }
];

export const ExhibitorSettingsPage = () => {
  const { searchParamsObject, removeQueryParam } = useSetParams();
  const tab = searchParamsObject?.['tab'];
  const [selectedTab, setSelectedTab] = useState(
    tab ?? ExhibitorSettingsPageEnum.BUSINESS_INFORMATION
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
      <Tabs
        defaultValue={selectedTab}
        className="flex w-full flex-col justify-start gap-6"
      >
        <TabsList className="flex bg-transparent h-[2.7rem] px-[1rem] py-0  gap-x-4 border-b-1 border-b-input rounded-none w-full justify-start">
          {TABS_ITEMS.map((tab) => {
            return (
              <TabsTrigger
                value={tab.value}
                key={tab.label}
                className="px-[10px] cursor-pointer border-b rounded-none bg-transparent data-[state=active]:rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-tertiary data-[state=active]:border-3 data-[state=active]:text-tertiary  data-[state=active]:shadow-none self-start max-w-min w-full py-4.5"
                onClick={() => handleSelectedTab(tab.value)}
              >
                <span>{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent
          value={ExhibitorSettingsPageEnum.BUSINESS_INFORMATION}
          className="p-0 md:px-3 m-0"
        >
          <div className="mt-1">
            <ExhibitorBusinessInfoForm />
          </div>
        </TabsContent>

        <TabsContent
          value={ExhibitorSettingsPageEnum.MY_PROFILE}
          className="p-0 md:px-3 m-0"
        >
          <div className="mt-1">
            <ExhibitorProfileForm />
          </div>
        </TabsContent>

        <TabsContent
          value={ExhibitorSettingsPageEnum.CHANGE_PASSWORD}
          className="p-0 md:px-3 m-0"
        >
          <div className="mt-1">
            <ExhibitorChangePasswordForm />
          </div>
        </TabsContent>
        <TabsContent
          value={ExhibitorSettingsPageEnum.BOOTH_MEMBERS}
          className="p-0 md:px-3 m-0"
        >
          <div className="mt-1">
            <ExhibitorBoothMembers />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};
