'use client';

import { ReactNode } from 'react';

interface ContentCardProps {
  children?: ReactNode;
  title: string;
  description?: string;
}

export const ContentCard = ({
  children,
  title,
  description
}: ContentCardProps) => {
  return (
    <div className="bg-background py-3 px-6 rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <h4 className="text-foreground text-lg font-semibold">{title}</h4>
      {description && <p className="mt-4 text-sm">{description}</p>}
      {children}
    </div>
  );
};
