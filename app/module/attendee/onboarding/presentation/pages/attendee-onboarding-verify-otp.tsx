import { AuthCard } from '@/app/module/auth/components/auth-card';
import { AuthContainer } from '@/app/module/auth/components/auth-container';
import { AttendeeVerifyOtpForm } from '../organisms/attendee-verify-otp-form';

export const AttendeeOnboardingVerifyOtpPage = () => {
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
              Finish Registration
            </h2>
            <p className="text-[.9rem] text-text-tertiary">
              Kindly fill up yur details
            </p>
          </header>
        </div>
        <AttendeeVerifyOtpForm />
      </AuthCard>
    </AuthContainer>
  );
};
