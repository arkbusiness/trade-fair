import { getQueryClient, serverFetcher } from '@/app/core/shared/lib';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { getAttendeeExhibitorByIdQueryOptions } from '../../api/exhibitor-query-options';
import { AttendeeExhibitor } from '../../types';
import {
  AttendeeExhibitorDetailHero,
  AttendeeExhibitorDetailsActions,
  AttendeeExhibitorDetailsHeader
} from '../molecules';
import { AttendeeExhibitorDetailsTab } from '../organisms';

interface AttendeeExhibitorDetailsPageProps {
  id: string;
}

export const AttendeeExhibitorDetailsPage = async ({
  id
}: AttendeeExhibitorDetailsPageProps) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: getAttendeeExhibitorByIdQueryOptions({
      exhibitorId: id
    }).queryKey,
    queryFn: () => {
      return serverFetcher({
        url: getAttendeeExhibitorByIdQueryOptions({
          exhibitorId: id
        }).url
      });
    }
  });

  const exhibitor = (await queryClient.getQueryData(
    getAttendeeExhibitorByIdQueryOptions({
      exhibitorId: id
    }).queryKey
  )) as AttendeeExhibitor;

  if (!exhibitor) {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AttendeeExhibitorDetailsHeader exhibitorId={id} />
      <div className="mt-6">
        <AttendeeExhibitorDetailHero exhibitorId={id} />
        <AttendeeExhibitorDetailsActions exhibitorId={id} />
        <div className="mt-6.5">
          <AttendeeExhibitorDetailsTab exhibitorId={id} />
        </div>
      </div>
    </HydrationBoundary>
  );
};
