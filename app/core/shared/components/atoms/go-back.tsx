'use client';

import { useRouter } from 'nextjs-toploader/app';

interface GoBackButtonProps {
  title?: string;
  route?: string;
}

export const GoBackButton = ({
  title = 'Go back',
  route
}: GoBackButtonProps) => {
  const router = useRouter();

  const handleGoToPreviousPage = () => {
    if (!route) {
      router.back();
    } else {
      router.push(route);
    }
  };

  return (
    <button
      type="button"
      className="flex gap-[0.13rem] items-center text-secondary stroke-secondary cursor-pointer opacity-70 relative -left-1"
      onClick={handleGoToPreviousPage}
    >
      <svg
        width={20}
        height={21}
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Go Back Arrow Icon"
      >
        <path
          d="M12.5 15.6666L7.5 10.6666L12.5 5.66663"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
      <span className="text-xs font-light inline mt-0.5">{title}</span>
    </button>
  );
};
