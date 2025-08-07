'use client';

import { Eye, EyeOff } from 'lucide-react';
import { ComponentProps, useState } from 'react';
import { Input } from '../atoms';

interface PasswordInputProps extends ComponentProps<'input'> {
  label?: string;
  hasError?: boolean;
  showInfo?: boolean;
}

export const PasswordInput = ({
  label,
  hasError,
  showInfo = true,
  ...props
}: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const inputType = isVisible ? 'text' : 'password';

  return (
    <div className="flex flex-col gap-[0.5rem] w-full">
      <label htmlFor={props.name} className="text-[0.75rem] font-medium">
        {label || 'Password'}
      </label>
      <div className="flex justify-center w-full relative items-center">
        <Input
          type={inputType}
          {...props}
          className="w-full inline-block"
          hasError={hasError}
        />
        <div className="flex items-center justify-center absolute right-[1.2rem]">
          <button
            type="button"
            className="text-foreground"
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <Eye size={24} aria-label="Password shown" />
            ) : (
              <EyeOff size={24} aria-label="Password hidden" />
            )}
          </button>
        </div>
      </div>
      {showInfo && (
        <span className="text-text-tertiary block text-[0.63rem] italic">
          Password must be at least 8 characters long
        </span>
      )}
    </div>
  );
};
