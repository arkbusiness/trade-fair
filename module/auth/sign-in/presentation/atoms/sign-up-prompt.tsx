import Link from 'next/link';

export const SignupPrompt = ({ href }: { href: string }) => (
  <p className="text-tertiary gap-1 text-center">
    You don’t have an account?{' '}
    <Link href={href}>
      <strong className="underline">Sign up</strong>
    </Link>
  </p>
);
