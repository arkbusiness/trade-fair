'use client';

import { useExhibitorAuthStore } from '@/app/module/auth/store';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { SplashScreen } from '../shared/components/atoms';
import { EXHIBITOR_APP_ROUTES } from '../shared/constants';
import { useScrollToTop } from '../shared/hooks';
import { useExhibitorUser } from '../shared/hooks/api/use-exhibitor-user';

export const ExhibitorAuthProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const router = useRouter();
  useScrollToTop();

  const { handleLoadToken, accessToken, hasCheckedToken } =
    useExhibitorAuthStore();
  const { user } = useExhibitorUser();

  useEffect(() => {
    if (!accessToken && hasCheckedToken) {
      router.push(EXHIBITOR_APP_ROUTES.auth.login());
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
