'use client';

import { BorderTab } from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';

export enum CHAT_TAB {
  ALL = 'all',
  UNREAD = 'unread'
}

export const ChatTabs = () => {
  const { searchParamsObject, setParam } = useSetParams();
  const tab = searchParamsObject?.chat || CHAT_TAB.ALL;
  const CHAT_TAB_LIST = [
    {
      label: 'All',
      value: CHAT_TAB.ALL,
      count: 10
    },
    {
      label: 'Unread',
      value: CHAT_TAB.UNREAD,
      count: 5
    }
  ];

  const handleTabChange = (value: string) => {
    setParam('chat', value);
  };

  console.log(searchParamsObject);

  return (
    <div>
      <BorderTab
        tabs={CHAT_TAB_LIST}
        defaultValue={tab}
        showCount
        selectedValue={tab}
        variant="chat"
        handleSelectedTab={(tab) => {
          handleTabChange(tab.value);
        }}
      />
    </div>
  );
};
