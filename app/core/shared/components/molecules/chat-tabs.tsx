'use client';

import { BorderTab } from '@/app/core/shared/components/molecules';
import { CHAT_TAB, useMessageSlice } from '@/app/core/shared/slice';

export const ChatTabs = () => {
  const { tab, setTab, setSelectedUserId } = useMessageSlice();

  const CHAT_TAB_LIST = [
    {
      label: 'All',
      value: CHAT_TAB.ALL,
      count: undefined
    }
  ];

  const handleTabChange = (value: string) => {
    if (value === CHAT_TAB.ALL) {
      setSelectedUserId('');
      setTab(CHAT_TAB.ALL);
    } else {
      setSelectedUserId('');
      setTab(CHAT_TAB.UNREAD);
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
