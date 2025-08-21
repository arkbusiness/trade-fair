import { cn } from '@/app/core/shared/utils';
import { ComponentProps } from 'react';

export interface InputProps extends ComponentProps<'input'> {
  label?: string;
  inputClassName?: string;
  hasError?: boolean;
}

function Input({ type, hasError, inputClassName, ...props }: InputProps) {
  const { name, label } = props;

  return (
    <div className="flex flex-col gap-[0.5rem] w-full">
      {label && (
        <label htmlFor={name} className="text-[0.75rem] font-medium">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        data-slot="input"
        {...props}
        className={cn(
          'file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-[1px] border-input flex h-[2.5rem] rounded-[4px] w-full min-w-0 bg-transparent px-3 py-1 outline-none file:inline-flex file:h-[2.5rem] file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive placeholder:text-muted-foreground/70',
          {
            'bg-tertiary/20 border-tertiary/20': hasError
          },
          inputClassName
        )}
      />
    </div>
  );
}

export { Input };
