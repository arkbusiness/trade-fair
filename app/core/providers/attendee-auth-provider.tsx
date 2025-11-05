'use client';

import { useAttendeeAuthStore } from '@/app/module/auth/store';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { SplashScreen } from '../shared/components/atoms';
import { ATTENDEE_APP_ROUTES } from '../shared/constants';
import { useScrollToTop } from '../shared/hooks';
import { useAttendeeUser } from '../shared/api';

export const AttendeeAuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  useScrollToTop();

  const { handleLoadToken, accessToken, hasCheckedToken } =
    useAttendeeAuthStore();
  const { user } = useAttendeeUser();

  useEffect(() => {
    if (!accessToken && hasCheckedToken) {
      router.push(ATTENDEE_APP_ROUTES.auth.login());
    }
  }, [accessToken, hasCheckedToken, router]);

  useEffect(() => {
    handleLoadToken();
  }, [handleLoadToken]);

  if (accessToken && !user) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};
