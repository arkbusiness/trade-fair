import { AuthCard, AuthContainer } from '@/module/auth/components';
import { SigninForm } from '../organisms';

export const SigninPage = () => {
  return (
    <AuthContainer>
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
            <p className="text-[.9rem] text-text-tertiary flex max-w-[320px] w-full mx-auto">
              Enter your credentials to access your account
            </p>
          </header>
        </div>
        <SigninForm />
      </AuthCard>
    </AuthContainer>
  );
};
