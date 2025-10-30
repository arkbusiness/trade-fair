'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/app/core/shared/components/atoms';
import {
  ATTENDEE_APP_ROUTES,
  EXHIBITOR_APP_ROUTES,
  ORGANIZER_APP_ROUTES
} from '@/app/core/shared/constants';
import { useSetParams } from '@/app/core/shared/hooks';
import { errorHandler } from '@/app/core/shared/utils';
import { AuthCard, AuthContainer } from '@/app/module/auth/components';
import {
  useExhibitorAuthStore,
  useOrganizerAuthStore
} from '@/app/module/auth/store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useExhibitorSignin, useOrganizerSignin } from '../../api';
import { AttendeeSigninForm, SigninForm } from '../organisms';
import { ISigninFormValues } from '../organisms/sign-in-form';

enum TABS_ITEMS_ENUM {
  ORGANIZER = 'organizer',
  EXHIBITOR = 'exhibitor',
  ATTENDEE = 'attendee'
}

const TABS_ITEMS = [
  {
    value: TABS_ITEMS_ENUM.ATTENDEE,
    label: 'Attendee'
  },
  {
    value: TABS_ITEMS_ENUM.ORGANIZER,
    label: 'Organizer'
  },
  {
    value: TABS_ITEMS_ENUM.EXHIBITOR,
    label: 'Exhibitor'
  }
];

export const SigninPage = () => {
  const { searchParamsObject } = useSetParams();
  const queryTab = searchParamsObject?.['tab'] ?? TABS_ITEMS_ENUM.ATTENDEE;
  const [selectedTab, setSelectedTab] = useState(queryTab);
  const router = useRouter();
  const { handleSaveToken: handleOrganizerSaveToken } = useOrganizerAuthStore();
  const { handleSaveToken: handleExhibitorSaveToken } = useExhibitorAuthStore();

  const {
    signinMutation: organizerSigninMutation,
    isPending: isOrganizerPending
  } = useOrganizerSignin({
    onSuccess: (data) => {
      const token = data?.accessToken;
      if (token) {
        handleOrganizerSaveToken({ accessToken: token });
        router.push(ORGANIZER_APP_ROUTES.root());
      } else {
        toast.error('Something went wrong');
      }
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
    }
  });

  const {
    signinMutation: exhibitorSigninMutation,
    isPending: isExhibitorPending
  } = useExhibitorSignin({
    onSuccess: (data) => {
      const token = data?.accessToken;
      if (token) {
        handleExhibitorSaveToken({ accessToken: token });
        router.push(EXHIBITOR_APP_ROUTES.root());
      } else {
        toast.error('Something went wrong');
      }
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
    }
  });

  const handleChangeTab = (value: TABS_ITEMS_ENUM) => {
    setSelectedTab(value);
  };

  const handleOrganizerSubmit = (values: ISigninFormValues) => {
    organizerSigninMutation(values);
  };

  const handleExhibitorSubmit = (values: ISigninFormValues) => {
    exhibitorSigninMutation(values);
  };

  const handleDashboardRoute = () => {
    if (selectedTab === TABS_ITEMS_ENUM.ORGANIZER) {
      return ORGANIZER_APP_ROUTES.root();
    } else if (selectedTab === TABS_ITEMS_ENUM.EXHIBITOR) {
      return EXHIBITOR_APP_ROUTES.root();
    } else {
      return ATTENDEE_APP_ROUTES.root();
    }
  };

  const dashboardRoute = handleDashboardRoute();

  return (
    <>
      <div className="flex justify-between gap-5 items-center flex-wrap">
        <Link href={dashboardRoute} className="inline-block max-w-[100px]">
          <Image
            src="/images/logo.svg"
            alt="ARK Logo"
            width={100}
            height={21}
            className="object-contain w-[5rem] sm:w-[6.35rem]"
          />
        </Link>
      </div>
      <div className="w-full mt-[4.61rem]">
        <AuthContainer>
          <Tabs
            defaultValue={selectedTab}
            className="flex w-full flex-col justify-start items-center gap-6"
          >
            <div className="flex items-center justify-between w-full mb-4">
              <div className="flex justify-center w-full">
                <TabsList className="flex justify-center bg-transparent h-[2.7rem] px-[1rem] rounded-[6px] gap-x-4">
                  {TABS_ITEMS.map((tab) => {
                    return (
                      <TabsTrigger
                        value={tab.value}
                        key={tab.label}
                        className="px-[10px] cursor-pointer data-[state=active]:bg-highlight data-[state=active]:text-tertiary rounded-[6px] data-[state=active]:shadow-none"
                        onClick={() => handleChangeTab(tab.value)}
                      >
                        {tab.label}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>
            </div>

            <AuthCard>
              <div className="mb-[1.61rem]">
                <header className="flex flex-col gap-[0.66rem] text-center">
                  <h2
                    className={
                      'text-[1.13rem] font-semibold text-center text-text-secondary'
                    }
                  >
                    Sign in to your account
                  </h2>
                  <p className="text-[.9rem] text-text-tertiary">
                    Enter your credentials to continue
                  </p>
                </header>
              </div>

              {/* Organizer */}
              <TabsContent value={TABS_ITEMS_ENUM.ORGANIZER}>
                <SigninForm
                  isLoading={isOrganizerPending}
                  handleSubmitForm={handleOrganizerSubmit}
                />
              </TabsContent>

              {/* Exhibitor */}
              <TabsContent value={TABS_ITEMS_ENUM.EXHIBITOR}>
                <SigninForm
                  isLoading={isExhibitorPending}
                  handleSubmitForm={handleExhibitorSubmit}
                />
              </TabsContent>

              {/* Attendee */}
              <TabsContent value={TABS_ITEMS_ENUM.ATTENDEE}>
                <AttendeeSigninForm />
              </TabsContent>
            </AuthCard>
          </Tabs>
        </AuthContainer>
      </div>
    </>
  );
};
