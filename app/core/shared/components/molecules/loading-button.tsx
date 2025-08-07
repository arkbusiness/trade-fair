import { Loader2 } from 'lucide-react';
import { Button } from '../atoms';
import { ButtonProps } from '../atoms/button';

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export const LoadingButton = ({
  children,
  isLoading,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button {...props}>
      {isLoading && <Loader2 className="animate-spin" />}
      {children}
    </Button>
  );
};
