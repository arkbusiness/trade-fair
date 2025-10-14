import { AuthCard } from '@/app/module/auth/components/auth-card';
import { AuthContainer } from '@/app/module/auth/components/auth-container';
import { AttendeeRequestOtpForm } from '../organisms';

export const AttendeeOnboardingPage = () => {
  return (
    <AuthContainer className="max-w-[34.75rem]">
      <AuthCard>
        <div className="mb-[1.61rem]">
          <header className="flex flex-col gap-[0.66rem] text-center">
            <h2
              className={
                'text-[1.13rem] font-semibold text-center text-text-secondary'
              }
            >
              Sign up
            </h2>
            <p className="text-[.9rem] text-text-tertiary">
              We’ll send you an OTP to the email address you provide below.
            </p>
          </header>
        </div>
        <AttendeeRequestOtpForm />
      </AuthCard>
    </AuthContainer>
  );
};
