interface ErrorTextProps {
  message?: string;
}

export const ErrorText = ({ message }: ErrorTextProps) => (
  <>
    {message && (
      <p className="text-[0.8rem] text-red-600 mt-[0.5rem] leading-[1rem]">
        {message}
      </p>
    )}
  </>
);
