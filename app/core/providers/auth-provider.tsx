'use client';

// import { useAuthStore } from '@/module/auth/store';
// import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
// import { SplashScreen } from '../shared/components/atoms';
// import { useUser } from '../shared/hooks/api';

export const AuthProvider = ({ children, signInRoute }: { children: ReactNode, signInRoute: string }) => {
  // TODO: UNCOMMENT
  // const router = useRouter();

  // const { handleLoadToken, accessToken, hasCheckedToken } = useAuthStore();

  // const { user } = useUser();

  // useEffect(() => {
  //   if (!accessToken && hasCheckedToken) {
  //     router.push(signInRoute);
  //   }
  // }, [accessToken, hasCheckedToken, router]);

  // useEffect(() => {
  //   handleLoadToken();
  // }, [handleLoadToken]);

  // if (accessToken && !user) {
  //   return <SplashScreen />;
  // }

  return <>{children}</>;
};
