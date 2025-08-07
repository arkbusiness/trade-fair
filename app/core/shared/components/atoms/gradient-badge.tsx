import { cn } from '../../utils';

interface GradientBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GradientBadge({
  children,
  className,
  ...props
}: GradientBadgeProps) {
  return (
    <div
      className={cn(
        'rounded-[12px] flex items-center h-[1.5rem] min-w-[4.56rem] px-2 justify-center py-[0.5rem] bg-[linear-gradient(100.62deg,var(--burnt-orange)_-110.9%,var(--golden-yellow)_-18.04%,var(--dark-brown)_241.02%)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
