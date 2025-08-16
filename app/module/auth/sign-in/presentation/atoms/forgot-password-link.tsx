import Link from 'next/link';

export const ForgotPasswordLink = () => (
  <p className="text-tertiary gap-1 text-center text-[0.75rem]">
    <Link href="/forgot-password">
      <span className="hover:underline">Forgot password</span>
    </Link>
  </p>
);
