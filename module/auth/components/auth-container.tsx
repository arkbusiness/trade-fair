import { ReactNode } from 'react';

interface AuthContainerProps {
  children: ReactNode;
}

export const AuthContainer = ({ children }: AuthContainerProps) => {
  return <div className="max-w-[33.94rem] w-full mx-auto">{children}</div>;
};
