import { ChatInput } from '@/app/core/shared/components/molecules';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { useMessageSlice } from '@/app/core/shared/slice';
import { messagingService } from '../../services/messaging.service';
import { useState } from 'react';
import { errorHandler } from '@/app/core/shared/utils';
import toast from 'react-hot-toast';

export const ExhibitorChatInput = () => {
  const [message, setMessage] = useState('');
  const { selectedUserId } = useMessageSlice();
  const mutation = useCustomMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const messageContent = message.trim();

      mutation.mutate(
        messagingService.postMessage(selectedUserId, {
          content: messageContent
        }),
        {
          onError(error) {
            const errorMessage = errorHandler(error);
            toast.error(errorMessage);
          }
        }
      );
      setMessage('');
    }
  };

  const handleChange = (value: string) => {
    setMessage(value);
  };

  const isDisabled = mutation.isPending || !selectedUserId;

  return (
    <ChatInput
      isDisabled={isDisabled}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      message={message}
    />
  );
};
