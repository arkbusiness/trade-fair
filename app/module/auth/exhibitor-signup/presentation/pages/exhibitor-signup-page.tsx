import { AuthCard } from '@/app/module/auth/components/auth-card';
import { AuthContainer } from '@/app/module/auth/components/auth-container';
import { SigninPrompt } from '../../../sign-in/presentation/atoms';
import { EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants';
import { ExhibitorSignupForm } from '../organisms';

export const ExhibitorSignupPage = () => {
  return (
    <AuthContainer className="max-w-[35.94rem]">
      <div className="mb-[3.19rem]">
        <SigninPrompt href={EXHIBITOR_APP_ROUTES.auth.login()} />
      </div>
      <AuthCard>
        <div className="mb-[1.61rem]">
          <header className="flex flex-col gap-[0.66rem] text-center">
            <h2
              className={
                'text-[1.13rem] font-semibold text-center text-text-secondary'
              }
            >
              Create your account
            </h2>
            <p className="text-[.9rem] text-text-tertiary">
              Enter your business information to get started
            </p>
          </header>
        </div>
        <ExhibitorSignupForm />
      </AuthCard>
    </AuthContainer>
  );
};
