import { cn } from '../../utils';

interface IContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const MainContainer = ({ children, className }: IContainerProps) => (
  <div
    className={cn(
      'w-full max-w-[1440px] mx-auto px-[1rem] sm:px-[2.88rem]',
      className
    )}
  >
    {children}
  </div>
);
