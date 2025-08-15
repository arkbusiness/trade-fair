import Link from 'next/link';

export const SignupPrompt = () => (
  <p className="text-tertiary gap-1 text-center">
    You don’t have an account?{' '}
    <Link href="/sign-up">
      <strong className="underline">Sign up</strong>
    </Link>
  </p>
);
