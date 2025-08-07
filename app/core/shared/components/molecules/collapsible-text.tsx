'use client';

import { Button, Text } from '@/app/core/shared/components/atoms';
import { useState } from 'react';
import { cn } from '../../utils';

const MAX_TEXT_LENGTH = 100;

interface CollapsibleTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

export const CollapsibleText = ({
  text,
  maxLength = MAX_TEXT_LENGTH,
  className
}: CollapsibleTextProps) => {
  const [expanded, setExpanded] = useState(false);
  const subStringEndLength = expanded ? text.length : maxLength;

  const textToDisplay = text.substring(0, subStringEndLength);
  const isTextTruncated = text.length > maxLength;

  return (
    <div className="flex flex-col gap-[0.2rem]">
      <Text
        className={cn(className, expanded ? 'line-clamp-none' : 'line-clamp-1')}
      >
        <span>{textToDisplay}</span>
      </Text>
      {isTextTruncated && (
        <Button
          variant="ghost"
          className="gap-[0.5rem] flex items-center p-1 h-auto w-14 text-burnt-orange font-semibold"
          type="button"
          onClick={() => setExpanded(!expanded)}
        >
          <span>{expanded ? 'Show less' : 'Show more'}</span>
        </Button>
      )}
    </div>
  );
};
