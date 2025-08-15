import {
  MetricCard,
  MetricCardSkeleton
} from '@/app/core/shared/components/atoms';
import {
  Box,
  Calendar,
  CircleCheckBig,
  CircleX,
  Upload,
  User,
  Users
} from 'lucide-react';

const stats = {
  engagement: {
    loggedInAttendees: 1000,
    invitedAttendees: 2000, // Used
    loggedInExhibitors: 100,
    invitedExhibitors: 200, // Used
    exhibitorCompletionRate: +(200).toFixed(2)
  },
  counts: {
    registeredExhibitors: 400, // Used
    invitedExhibitors: 2500, // Used
    registeredAttendees: 1000, // Used
    invitedAttendees: 3000, // Used
    totalProducts: 500, // Used
    productsUploadedInRange: 100 // Used
  }
};

export const OrganizerOverviewStat = () => {
  const isLoading = false;

  const PERFORMANCE_STATS = [
    {
      title: 'Registered Exhibitors/Invited',
      value: `${stats.counts.registeredExhibitors?.toLocaleString()}/${stats.counts.invitedExhibitors?.toLocaleString()}`,
      icon: <User className="text-tertiary" />,
      info: ''
    },
    {
      title: 'Registered Attendees/Invited',
      value: `${stats.counts.registeredAttendees?.toLocaleString()}/${stats.counts.invitedAttendees?.toLocaleString()}`,
      icon: <Users className="text-tertiary" />,
      info: ''
    },
    {
      title: 'Total Products',
      value: `${stats.counts.totalProducts?.toLocaleString()}`,
      icon: <Box className="text-tertiary" />,
      info: ''
    },
    {
      title: 'Products Uploaded',
      value: `${stats.counts.productsUploadedInRange?.toLocaleString()}`,
      icon: <Upload className="text-tertiary" />,
      info: ''
    }
  ];

  const APPOINTMENT_STATS = [
    {
      title: 'Scheduled Appointments',
      value: (2500)?.toLocaleString(),
      icon: <Calendar className="text-light-blue" />,
      info: ''
    },
    {
      title: 'Successful Appointments',
      value: `${(2800)?.toLocaleString()}/${(3000)?.toLocaleString()}`,
      icon: <CircleCheckBig className="text-green-600" />,
      info: ''
    },
    {
      title: 'Cancelled Appointments',
      value: `${(33)?.toLocaleString()}`,
      icon: <CircleX className="text-red-600" />,
      info: ''
    }
  ];

  return (
    <>
      {isLoading ? (
        <OrganizerOverviewStatSkeleton />
      ) : (
        <div className="flex flex-col gap-7">
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(290px,_1fr))] items-stretch  gap-x-[0.75rem] gap-y-2">
            {PERFORMANCE_STATS.map((stat) => {
              return (
                <MetricCard
                  key={stat.title}
                  label={stat.title}
                  value={stat.value}
                  icon={
                    <div className="h-12 w-12 rounded-full flex items-center justify-center bg-accent/60">
                      {stat.icon}
                    </div>
                  }
                  info={stat.info}
                />
              );
            })}
          </div>
          <div>
            <h2 className="text-secondary text-2xl font-medium mb-5">
              Appointment Statistics
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(290px,_1fr))] items-stretch  gap-x-[0.75rem] gap-y-2 mt-4">
              {APPOINTMENT_STATS.map((stat) => {
                return (
                  <MetricCard
                    key={stat.title}
                    label={stat.title}
                    value={stat.value}
                    icon={
                      <div className="h-12 w-12 rounded-full flex items-center justify-center bg-accent/60">
                        {stat.icon}
                      </div>
                    }
                    info={stat.info}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const OrganizerOverviewStatSkeleton = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(253px,_1fr))] items-stretch  gap-x-[0.75rem] gap-y-2">
      {Array.from({ length: 4 }).map((_, index) => {
        const key = `organizer-overview-stat-${index}`;
        return <MetricCardSkeleton key={key} />;
      })}
    </div>
  );
};
