'use client';

import { cn } from '@/app/core/shared/utils';
import { useState } from 'react';

interface ExpandableTextProps {
  content: string;
  maxLength?: number;
  className?: string;
  expandText?: string;
  collapseText?: string;
}

const DEFAULT_MAX_LENGTH = 200;

export const ExpandableText = ({
  content,
  maxLength = DEFAULT_MAX_LENGTH,
  className,
  expandText = 'Show more',
  collapseText = 'Show less'
}: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!content || content.length <= maxLength) {
    return <div className={className}>{content}</div>;
  }

  const displayText = isExpanded ? content : content.substring(0, maxLength);
  const shouldShowToggle = content.length > maxLength;

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={cn('text-sm leading-relaxed', className)}>
      <span>{displayText}</span>
      {!isExpanded && shouldShowToggle && <span>...</span>}
      {shouldShowToggle && (
        <button
          onClick={handleToggle}
          className="ml-2 text-tertiary hover:text-tertiary/80 font-medium transition-colors cursor-pointer"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? `Collapse text` : `Expand text`}
        >
          {isExpanded ? collapseText : expandText}
        </button>
      )}
    </div>
  );
};
