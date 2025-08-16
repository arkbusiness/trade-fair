import { ReactNode } from 'react';

interface LabelValueCardProps {
  label: string;
  value: string | ReactNode;
}

export const LabelValueCard = ({ label, value }: LabelValueCardProps) => {
  return (
    <div className="flex flex-col">
      <h4 className="text-sm font-medium text-foreground">{label}</h4>
      <div className="text-xs font-medium mt-1.5">{value}</div>
    </div>
  );
};
