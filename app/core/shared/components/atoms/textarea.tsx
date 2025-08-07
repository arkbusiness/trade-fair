import { forwardRef } from 'react';
import { cn } from '../../utils';

interface InputProps extends React.ComponentProps<'textarea'> {
  label?: string;
  hasError?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, hasError, ...props }, ref) => {
    const { name, label } = props;
    return (
      <div className="flex flex-col gap-[0.5rem] w-full">
        {label && (
          <label htmlFor={name} className="text-[0.75rem] font-medium">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'flex min-h-[88px] border border-input selection:bg-primary selection:text-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  placeholder:text-muted-foreground/70  w-full rounded-[4px]',
            {
              'bg-tertiary/20 border-tertiary/20': hasError
            },
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
