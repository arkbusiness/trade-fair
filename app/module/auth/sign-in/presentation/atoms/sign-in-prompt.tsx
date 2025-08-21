import Link from 'next/link';

export const SigninPrompt = ({ href }: { href: string }) => (
  <p className="text-tertiary gap-1 text-center">
    Already have an account?{' '}
    <Link href={href}>
      <strong className="underline">Sign in</strong>
    </Link>
  </p>
);
