'use client';

import { ORGANIZER_APP_ROUTES } from '@/app/core/shared/constants';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { errorHandler } from '@/app/core/shared/utils';
import { AuthCard, AuthContainer } from '@/app/module/auth/components';
import { organizerAuthService } from '@/app/module/auth/services';
import { useOrganizerAuthStore } from '@/app/module/auth/store';
import { useRouter } from 'nextjs-toploader/app';
import toast from 'react-hot-toast';
import { SigninForm } from '../organisms';
import { ISigninFormValues } from '../organisms/sign-in-form';

export const OrganizerSigninPage = () => {
  const router = useRouter();
  const { handleSaveToken, handleLogOut } = useOrganizerAuthStore();
  const mutation = useCustomMutation<{
    accessToken: string;
  }>();

  const handleSubmit = (values: ISigninFormValues) => {
    mutation.mutate(organizerAuthService.signin(values), {
      onError(error) {
        handleLogOut();
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess(data) {
        const token = data?.accessToken;
        if (token) {
          handleSaveToken({ accessToken: token });
          router.push(ORGANIZER_APP_ROUTES.root());
        } else {
          toast.error('Something went wrong');
        }
      }
    });
  };

  return (
    <AuthContainer>
      {/* <div className="mb-4.5">
        <SignupPrompt href={ORGANIZER_APP_ROUTES.auth.signup()} />
      </div> */}
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
        <SigninForm
          isLoading={mutation.isPending}
          handleSubmitForm={handleSubmit}
        />
      </AuthCard>
    </AuthContainer>
  );
};
