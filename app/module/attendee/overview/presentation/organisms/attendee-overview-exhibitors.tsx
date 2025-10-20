'use client';

import { Card, CardContent, Spinner } from '@/app/core/shared/components/atoms';
import { ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { AttendeeExhibitorCard } from '../../../exhibitors/presentation/molecules';
import { useAttendeeExhibitors } from '../../../exhibitors/api';
import { useAttendeeOverview } from '../../hooks';

export const AttendeeOverviewExhibitors = () => {
  const { refetchOverviewStats } = useAttendeeOverview();
  const { exhibitors, isLoadingExhibitor, refetchExhibitor } =
    useAttendeeExhibitors({
      limit: '4'
    });

  const handleRefetch = () => {
    refetchExhibitor();
    refetchOverviewStats();
  };

  const isLoading = isLoadingExhibitor;

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
      <CardContent className="px-3.5 py-0 borderborder-solid">
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] items-stretch  gap-x-6 gap-y-2">
          {exhibitors.map((exhibitor) => {
            const isLiked = exhibitor.isFavorite;

            return (
              <AttendeeExhibitorCard
                key={exhibitor.id}
                exhibitorId={exhibitor.id}
                imageUrl={exhibitor.logoUrl || './images/empty-image.svg'}
                companyName={exhibitor.companyName}
                boothNumber={exhibitor.boothNumber}
                description={exhibitor.publicDescription}
                isLiked={isLiked}
                allowNavigation={false}
                handleRefetchExhibitors={handleRefetch}
              />
            );
          })}
        </div>
        {isLoading && <Spinner />}
      </CardContent>
    </Card>
  );
};
