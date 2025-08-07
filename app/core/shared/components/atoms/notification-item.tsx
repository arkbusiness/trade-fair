import { distanceFormat } from '../../lib';

interface NotificationProps {
  title: string;
  description: string;
  time: string;
}

export const NotificationItem = ({
  description,
  time,
  title
}: NotificationProps) => {
  return (
    <span className="p-3 border-b">
      <span className="flex justify-between items-start">
        <span className="flex items-start gap-2">
          <span className="font-semibold text-[0.8rem]">{title}</span>
        </span>
      </span>
      <span className="text-xs text-gray-600 ml-3.5 line-clamp-1">
        {description}
      </span>
      <span className="flex justify-between items-center mt-1 ml-3.5">
        <span className="text-xs text-foreground/80">
          {distanceFormat(time, new Date())}
        </span>
      </span>
    </span>
  );
};
