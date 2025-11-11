'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@/app/core/shared/components/atoms';
import { useEventStatus } from '../../hooks';
import { AlertCircle } from 'lucide-react';

interface EventInviteAlertProps {
  type: 'exhibitor' | 'attendee';
}

export const EventInviteAlert = ({ type }: EventInviteAlertProps) => {
  const { isOneDayBeforeEvent, isEventConcluded } = useEventStatus();

  // Don't show alert if conditions aren't met
  if (type === 'exhibitor' && !isOneDayBeforeEvent) return null;
  if (type === 'attendee' && !isEventConcluded) return null;

  const exhibitorMessage = isOneDayBeforeEvent
    ? 'Exhibitor Invitations close before the trade fair'
    : '';

  const attendeeMessage = isEventConcluded
    ? 'Attendee Invitations close after the trade fair'
    : '';

  const message = type === 'exhibitor' ? exhibitorMessage : attendeeMessage;
  const title =
    type === 'exhibitor'
      ? 'Exhibitor Invitations Closed'
      : 'Attendee Invitations Closed';

  return (
    <Alert variant="default" className="bg-yellow-100 border-0">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
