interface SkeletonWrapperProps {
  count?: number;
  children: React.ReactNode;
}

export const SkeletonWrapper = ({
  count = 4,
  children
}: SkeletonWrapperProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        const key = `skeleton-wrapper-${index}`;
        return (
          <div key={key} className="w-full">
            {children}
          </div>
        );
      })}
    </>
  );
};
