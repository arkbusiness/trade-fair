export const CountdownBox = ({
  value,
  label
}: {
  value: string;
  label: string;
}) => {
  return (
    <div className="flex items-center flex-col gap-1 justify-center h-[78px] w-[64px] sm:w-[84px] rounded bg-tertiary/85 py-3 px-5 text-background">
      <strong className="font-bold text-lg sm:text-2xl">{value}</strong>
      <span className="font-medium text-xs sm:text-sm">{label}</span>
    </div>
  );
};
