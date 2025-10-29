import { ChatInput } from '@/app/core/shared/components/molecules';
import { useMessageSlice } from '@/app/core/shared/slice';
import { errorHandler } from '@/app/core/shared/utils';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAttendeeCreateMessage } from '../../api';

export const AttendeeChatInput = () => {
  const [message, setMessage] = useState('');
  const { selectedUserId } = useMessageSlice();
  const { createMessageMutation, isLoading } = useAttendeeCreateMessage({
    onSuccess: () => {
      setMessage('');
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim()) {
      createMessageMutation({
        content: message.trim()
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
