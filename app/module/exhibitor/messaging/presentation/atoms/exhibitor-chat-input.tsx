import { ChatInput } from '@/app/core/shared/components/molecules';
import { useMessageSlice } from '@/app/core/shared/slice';
import { errorHandler } from '@/app/core/shared/utils';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useExhibitorCreateMessage } from '../../api';

export const ExhibitorChatInput = () => {
  const [message, setMessage] = useState('');
  const { selectedUserId } = useMessageSlice();
  const { createMessageMutation, isLoading } = useExhibitorCreateMessage({
    onSuccess: () => {
      setMessage('');
    },
    onError: (error: unknown) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const messageContent = message.trim();

      createMessageMutation({
        content: messageContent
      });
    }
  };

  const handleChange = (value: string) => {
    setMessage(value);
  };

  const isDisabled = isLoading || !selectedUserId;

  return (
    <ChatInput
      isDisabled={isDisabled}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      message={message}
    />
  );
};
