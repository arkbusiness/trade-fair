import Link from 'next/link';

export const SigninPrompt = () => (
  <p className="text-tertiary gap-1 text-center">
    Already have an account?{' '}
    <Link href="/sign-in">
      <strong className="underline">Sign in</strong>
    </Link>
  </p>
);
