import { AuthCard } from '@/app/module/auth/components/auth-card';
import { AuthContainer } from '@/app/module/auth/components/auth-container';
import { OrganizerSignupForm } from '../organisms';

export const OrganizerSignupPage = () => {
  return (
    <AuthContainer className="max-w-[35.94rem]">
      {/* <div className="mb-4.5">
        <SigninPrompt href={ORGANIZER_APP_ROUTES.auth.login()} />
      </div> */}
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
              Enter your information to get started
            </p>
          </header>
        </div>
        <OrganizerSignupForm />
      </AuthCard>
    </AuthContainer>
  );
};
