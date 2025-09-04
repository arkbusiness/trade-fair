'use client';

import { useState } from 'react';
import { cn, errorHandler } from '@/app/core/shared/utils';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import toast from 'react-hot-toast';
import { messagingService } from '../../services/messaging.service';
import { useSetParams } from '@/app/core/shared/hooks';

interface ChatInputProps {
  placeholder?: string;
}

export const ChatInput = ({
  placeholder = 'Type a message...'
}: ChatInputProps) => {
  const { searchParamsObject } = useSetParams();

  const attendeeId = searchParamsObject?.['attendeeId'] || '';

  const mutation = useCustomMutation();
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      mutation.mutate(
        messagingService.postMessage(attendeeId, {
          content: message.trim()
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isDisabled = mutation.isPending || !attendeeId;

  return (
    <div className="bg-gray-light-4 border-t p-4 h-[5.13rem] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 w-full h-12"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          disabled={isDisabled}
          className={cn(
            'flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent h-full block',
            {
              'opacity-50 cursor-not-allowed': isDisabled
            }
          )}
        />
        <button
          type="submit"
          disabled={!message.trim() || isDisabled}
          className={cn(
            'w-10 h-10 bg-tertiary text-white rounded-full flex items-center justify-center hover:bg-tertiary/90 transition-colors',
            {
              'opacity-50 cursor-not-allowed': !message.trim() || isDisabled
            }
          )}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 2L11 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 2L15 22L11 13L2 9L22 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};
