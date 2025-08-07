import { ButtonProps } from '../atoms';
import { LoadingButton } from './loading-button';

export const IconButton = ({ children, ...props }: ButtonProps) => (
  <LoadingButton className="flex gap-x-[6px]" {...props}>
    {children}
  </LoadingButton>
);
