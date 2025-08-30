'use client';

import { LinkButton, Spinner } from '@/app/core/shared/components/atoms';
import { EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants';
import { formatSchedule } from '@/app/core/shared/lib';
import { Clock } from 'lucide-react';
import { useExhibitorOverview } from '../../hooks';

export const RecentAppointments = () => {
  const { isLoadingOverviewStats, isRefetchingOverviewStats, overviewStats } =
    useExhibitorOverview();
  const isLoading = isLoadingOverviewStats || isRefetchingOverviewStats;

  const appointments = overviewStats?.appointments ?? [];
  const hasAppointments = appointments.length > 0;

  return (
    <div className="rounded-[8px] border border-input bg-background flex flex-col">
      <h2 className="text-lg font-semibold text-foreground px-3.5 py-4.5 border-b">
        Upcoming Appointments
      </h2>
      <div className="mt-7 px-6 flex-1">
        <div className="flex gap-6 flex-col">
          {isLoading && <Spinner />}
          {!isLoading &&
            hasAppointments &&
            appointments?.slice(0, 4).map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex gap-6 justify-between items-center"
                >
                  <div className="flex gap-2 items-center">
                    <div className="w-10 h-10 rounded-full text-light-blue bg-light-blue/10 flex items-center justify-center">
                      <Clock size={18} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-foreground truncate max-w-[250px]">
                        {item.attendee.email}
                      </p>
                      <p className="text-xs">
                        {
                          formatSchedule(
                            new Date(item.startTime),
                            new Date(item.endTime)
                          ).fullLabel
                        }
                      </p>
                    </div>
                  </div>
                  <div>
                    <LinkButton
                      variant="outline"
                      className="border-light-blue text-light-blue h-[29px] hover:bg-light-blue hover:text-background"
                      href={EXHIBITOR_APP_ROUTES.attendees.appointment.details(
                        item.id
                      )}
                    >
                      Details
                    </LinkButton>
                  </div>
                </div>
              );
            })}
          {!isLoading && !hasAppointments && (
            <p className="text-center text-foreground mb-5 flex items-center justify-center">
              No appointments available
            </p>
          )}
        </div>
      </div>
      {!isLoading && hasAppointments && (
        <div className="mb-4 mt-7 px-6">
          <LinkButton
            variant="tertiary"
            className="max-w-[9.75rem]"
            href={EXHIBITOR_APP_ROUTES.attendees.appointment.root()}
          >
            View All Appointments
          </LinkButton>
        </div>
      )}
    </div>
  );
};
