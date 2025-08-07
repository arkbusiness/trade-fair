import { ReactNode } from 'react';

interface LabelValueCardProps {
  label: string;
  value: string | ReactNode;
  children?: ReactNode;
}

export const LabelValueCard = ({
  label,
  value,
  children
}: LabelValueCardProps) => {
  return (
    <div className="flex justify-between items-center gap-[0.75rem]">
      <div className="flex flex-gap flex-col gap-[0.55rem]">
        <h4 className="text-sm font-semibold">{label}</h4>
        <div className="font-normal text-xs text-foreground/70">{value}</div>
      </div>
      <div>{children && children}</div>
    </div>
  );
};
