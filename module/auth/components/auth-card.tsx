import { ReactNode } from 'react';

interface IAuthCardProps {
  children: ReactNode;
}

export const AuthCard = ({ children }: IAuthCardProps) => {
  return (
    <div className="px-[1.2rem] md:px-[2.5rem] py-[2.75rem] drop-shadow-[0px_1px_1px_rgba(0,_0,_0,_0.12)] border border-highlight rounded-[6px] bg-light-gray-2">
      {children}
    </div>
  );
};
