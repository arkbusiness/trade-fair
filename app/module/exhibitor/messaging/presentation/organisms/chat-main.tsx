'use client';

import { useSetParams } from '@/app/core/shared/hooks';
import { useAttendeeMessages } from '../../hooks/use-messages';
import { NoMessage } from '../atoms';
import { ChatInterface } from '../molecules';

export const ChatMain = () => {
  const { searchParamsObject } = useSetParams();
  const attendeeId = searchParamsObject?.['attendeeId'] ?? '';

  const { attendee } = useAttendeeMessages(attendeeId);

  const hasSelectedChat = !!attendeeId;

  return (
    <div className="flex h-full flex-col overflow-hidden border bg-white xl:w-3/4 relative">
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
