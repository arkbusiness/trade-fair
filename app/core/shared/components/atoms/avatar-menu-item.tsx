interface AvatarMenuItemProps {
  icon?: React.ReactNode;
  text: string;
  onClick: () => void;
}

export const AvatarMenuItem = ({
  text,
  icon,
  onClick
}: AvatarMenuItemProps) => {
  return (
    <button
      className="flex items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      {icon}
      <span className="text-[0.74rem] sm:text-[0.86rem] font-medium text-foreground/70 text-wrap whitespace-pre-wrap">
        {text}
      </span>
    </button>
  );
};
