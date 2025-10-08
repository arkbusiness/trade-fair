'use client';

import { BorderTab } from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';

export enum CHAT_TAB {
  ALL = 'all',
  UNREAD = 'unread'
}

export const ChatTabs = () => {
  const { searchParamsObject, setMultipleParam } = useSetParams();
  const tab = searchParamsObject?.['chat-type'] || CHAT_TAB.ALL;

  const CHAT_TAB_LIST = [
    {
      label: 'All',
      value: CHAT_TAB.ALL,
      count: undefined
    }
    // {
    //   label: 'Unread',
    //   value: CHAT_TAB.UNREAD,
    //   count: undefined
    // }
  ];

  const handleTabChange = (value: string) => {
    if (value === CHAT_TAB.ALL) {
      setMultipleParam({
        attendeeId: '',
        'chat-type': ''
      });
    } else {
      setMultipleParam({
        attendeeId: '',
        'chat-type': value
      });
    }
  };

  return (
    <div className="px-3 lg:px-0">
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
