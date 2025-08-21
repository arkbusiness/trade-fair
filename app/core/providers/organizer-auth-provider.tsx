'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { SplashScreen } from '../shared/components/atoms';
import { useOrganizerUser } from '../shared/hooks/api';
import { useOrganizerAuthStore } from '@/app/module/auth/store';
import { ORGANIZER_APP_ROUTES } from '../shared/constants';

export const OrganizerAuthProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const router = useRouter();

  const { handleLoadToken, accessToken, hasCheckedToken } =
    useOrganizerAuthStore();
  const { user } = useOrganizerUser();

  useEffect(() => {
    if (!accessToken && hasCheckedToken) {
      router.push(ORGANIZER_APP_ROUTES.auth.login());
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
