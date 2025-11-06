'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './appointments-calendar.module.css';
import { useSetParams } from '@/app/core/shared/hooks';
import { format } from 'date-fns';
import { useAttendeeOverview } from '@/app/module/attendee/overview/api';
interface AppointmentsCalendarProps {
  title?: string;
  onDateChange?: (date: Date | null) => void;
}

export const AppointmentsCalendar: React.FC<AppointmentsCalendarProps> = ({
  title = 'Choose meeting date',
  onDateChange
}) => {
  const { overviewStats } = useAttendeeOverview();

  const { eventStartDate, eventEndDate } = overviewStats?.organizer || {};

  const startDate = eventStartDate;
  const endDate = eventEndDate;

  const { setParam } = useSetParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange?.(date);

    if (date) {
      setParam('date', format(date, 'yyyy-MM-dd'));
    }
  };

  return (
    <div className="mx-auto max-w-[21.56rem] w-full">
      {/* Header */}
      <div className="mb-12">
        <h2 className="font-semibold text-secondary text-center">{title}</h2>
      </div>

      {/* Calendar */}
      <div className={styles.appointmentsCalendar}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
          calendarClassName="custom-calendar"
          minDate={startDate ? new Date(startDate) : undefined}
          maxDate={endDate ? new Date(endDate) : undefined}
          dayClassName={(date) => {
            const isSelected =
              selectedDate &&
              date.toDateString() === selectedDate.toDateString();
            const isToday = date.toDateString() === new Date().toDateString();

            if (isSelected) return 'selected-day';
            if (isToday) return 'today-day';
            return 'regular-day';
          }}
        />
      </div>
    </div>
  );
};
