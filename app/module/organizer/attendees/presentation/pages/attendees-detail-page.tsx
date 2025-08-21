import { AttendeesDetailHeader } from '../atoms';
import { AttendeeDetailHero } from '../molecules';
import { notFound } from 'next/navigation';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/app/core/shared/components/atoms';
import { organizerAttendeesService } from '../../services';
import { getQueryClient, serverFetcher } from '@/app/core/shared/lib';
import {
  AttendeeProfileInformation,
  AttendeeRegistrationDetails
} from '../organisms';

const TABS_ITEMS = [
  {
    value: 'profile',
    label: 'Profile Information'
  },
  {
    value: 'registration',
    label: 'Registration Details'
  }
];

export const AttendeesDetailPage = async ({ id }: { id: string }) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: organizerAttendeesService.getAttendeeById(id).queryKey,
    queryFn: () => {
      return serverFetcher({
        url: organizerAttendeesService.getAttendeeById(id).url
      });
    }
  });

  const attendee = queryClient.getQueryData(
    organizerAttendeesService.getAttendeeById(id).queryKey
  );

  if (!attendee) {
    return notFound();
  }

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
        <div className="mt-6">
          <Tabs defaultValue="profile">
            <TabsList className="border-b border-b-hr w-full max-w-full justify-start bg-transparent gap-x-8 h-13.5 rounded-none">
              {TABS_ITEMS.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="px-[10px] h-13.5 py-0cursor-pointer text-secondary rounded-none data-[state=active]:rounded-none  data-[state=active]:border-4 data-[state=active]:border-b-light-blue border-solid!  data-[state=active]:bg-transparent data-[state=active]:text-light-blue data-[state=active]:shadow-none data-[state=active]:font-semibold font-normal max-w-[128.38px] w-full"
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="profile" className="p-0 m-0">
              <div className="mt-[1.38rem]">
                <AttendeeProfileInformation id={id} />
              </div>
            </TabsContent>
            <TabsContent value="registration" className="p-0 m-0">
              <div className="mt-[1.38rem]">
                <AttendeeRegistrationDetails id={id} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
