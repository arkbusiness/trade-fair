import { cn } from '@/app/core/shared/utils';

export const HelperText = ({
  text,
  className
}: {
  text: string;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        'text-text-tertiary block text-[0.73rem] italic mt-[0.5rem]',
        className
      )}
    >
      {text}
    </span>
  );
};
