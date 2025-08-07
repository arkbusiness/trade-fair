import { LoaderCircle } from 'lucide-react';

const Spinner = () => {
  return (
    <div className="flex w-full justify-center items-center min-h-[40px]">
      <LoaderCircle className="text-primary animate-spin" size={24} />
    </div>
  );
};

Spinner.displayName = 'Spinner';

export { Spinner };
