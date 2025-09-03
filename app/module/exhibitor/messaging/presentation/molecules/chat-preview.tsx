'use client';

import { cn } from '@/app/core/shared/utils';
import { ChatPreviewItem } from '../atoms';

const chatPreviews = [
  {
    avatar: 'https://avatar.iran.liara.run/public/13',
    name: 'Alice Johnson',
    message: 'Hey! How was your weekend?',
    date: new Date('2025-08-30T14:23:00Z').toISOString()
  },
  {
    avatar: 'https://avatar.iran.liara.run/public/13',
    name: 'Bob Smith',
    message:
      "Looking forward to our meeting tomorrow. I can't wait to get in touch",
    date: new Date('2025-09-01T09:15:00Z').toISOString()
  },
  {
    avatar: 'https://avatar.iran.liara.run/public/21',
    name: 'Catherine Lee',
    message: 'Can you send me the files?',
    date: new Date('2025-09-02T17:45:00Z').toISOString()
  },
  {
    avatar: 'https://avatar.iran.liara.run/public/15',
    name: 'David Kim',
    message: 'Thanks for the update!',
    date: new Date('2025-09-03T08:05:00Z').toISOString()
  },
  {
    avatar: 'https://avatar.iran.liara.run/public/6',
    name: 'Elena Torres',
    message: 'Let’s catch up soon!',
    date: new Date('2025-08-31T20:30:00Z').toISOString()
  }
  //   {
  //     avatar: 'https://avatar.iran.liara.run/public/13',
  //     name: 'Franklin Yu',
  //     message: 'Got it. I’ll review and reply shortly.',
  //     date: new Date('2025-09-02T11:00:00Z').toISOString()
  //   },
  //   {
  //     avatar: '',
  //     name: 'Grace Park',
  //     message: 'Happy birthday! 🎉',
  //     date: new Date('2025-09-03T06:30:00Z').toISOString()
  //   }
];

const MAX_CHAT_PREVIEW = 6;

export const ChatPreview = () => {
  const isChatPreviewOverflow = (chatPreviews?.length || 0) > MAX_CHAT_PREVIEW;

  return (
    <div
      className={cn('flex flex-col gap-1 px-3', {
        'overflow-y-auto py-3': isChatPreviewOverflow
      })}
    >
      {chatPreviews.map((chatPreview) => (
        <ChatPreviewItem
          key={chatPreview.name}
          avatar={chatPreview.avatar}
          name={chatPreview.name}
          message={chatPreview.message}
          date={chatPreview.date}
          handleSelect={() => console.log(chatPreview.name)}
        />
      ))}
    </div>
  );
};
