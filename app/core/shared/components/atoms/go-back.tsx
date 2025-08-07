'use client';

import { useRouter } from 'nextjs-toploader/app';

interface GoBackButtonProps {
  title?: string;
  route?: `/${string}`;
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
      className="flex gap-[0.63rem] items-center gap stroke-tertiary text-tertiary cursor-pointer"
      onClick={handleGoToPreviousPage}
    >
      <svg
        width={14}
        height={14}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Go Back Arrow Icon"
      >
        <path
          d="M6.125 11.375L1.75 7M1.75 7L6.125 2.625M1.75 7H12.25"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-xs">{title}</span>
    </button>
  );
};
