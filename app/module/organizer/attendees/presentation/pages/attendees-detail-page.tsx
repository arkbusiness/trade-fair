import { AttendeesDetailHeader } from '../atoms';
import { AttendeeDetailHero } from '../molecules';

export const AttendeesDetailPage = ({ id }: { id: string }) => {
  return (
    <div
      className="w-full flex flex-col before:bg-gray-light-4 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-[-1]"
      id="attendees-detail"
    >
      <div className="no-print">
        <AttendeesDetailHeader id={id} />
      </div>
      <div className="mt-6">
        <AttendeeDetailHero id={id} />
      </div>
    </div>
  );
};
