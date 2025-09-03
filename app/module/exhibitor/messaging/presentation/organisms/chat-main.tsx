'use client';

import { useSetParams } from '@/app/core/shared/hooks';
import { useAttendeeMessages } from '../../hooks/use-messages';
import { NoMessage } from '../atoms';
import { ChatInterface } from '../molecules';
import { AlignLeft } from 'lucide-react';

export const ChatMain = () => {
  const { searchParamsObject, setParam } = useSetParams();
  const attendeeId = searchParamsObject?.['attendeeId'] ?? '';

  const { attendee } = useAttendeeMessages(attendeeId);

  const hasSelectedChat = !!attendeeId;

  return (
    <div className="flex h-full flex-col overflow-hidden border bg-white lg:w-3/4 relative">
      <button
        onClick={() => setParam('chat-drawer', '1')}
        className="cursor-pointer lg:hidden absolute top-4 left-4"
      >
        <AlignLeft size={24} />
      </button>

      {hasSelectedChat ? (
        <ChatInterface
          contactName={attendee?.name ?? ''}
          contactAvatar={attendee?.avatar}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <NoMessage />
        </div>
      )}
    </div>
  );
};
