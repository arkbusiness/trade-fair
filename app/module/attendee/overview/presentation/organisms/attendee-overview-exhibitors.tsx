import { Card, CardContent } from '@/app/core/shared/components/atoms';
import { ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const AttendeeOverviewExhibitors = () => {
  return (
    <Card className="w-full justify-between">
      <div className="flex justify-between gap-3 items-center px-3.5 border-b pb-4">
        <h2 className="text-lg font-medium">Explore Exhibitors</h2>
        <Link href={ATTENDEE_APP_ROUTES.exhibitors.root()}>
          <span className="flex gap-1 items-center text-light-blue-2">
            <span className="text-sm font-normal">View all</span>
            <ChevronRight size={16} />
          </span>
        </Link>
      </div>
      <CardContent className="px-3.5">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio
        voluptas unde consequuntur itaque architecto autem rerum perferendis
        minima nemo nulla debitis, ratione quibusdam dolores quisquam soluta
        accusantium magnam cupiditate eos?
      </CardContent>
    </Card>
  );
};
