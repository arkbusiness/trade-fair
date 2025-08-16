'use client';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from '@/app/core/shared/components/atoms';
import { ORGANIZER_APP_ROUTES } from '@/app/core/shared/constants';
import { User, Users } from 'lucide-react';
import { useRouter } from 'nextjs-toploader/app';

const QUICK_LINKS = [
  {
    title: 'Add New Exhibitor',
    message: 'Send Invite to an Exhibitor',
    icon: <User className="text-tertiary" size={18} />,
    // TODO: Add CORRECT link
    link: ORGANIZER_APP_ROUTES.exhibitors.root()
  },
  {
    title: 'Add New Attendee',
    message: 'Send Invite to an Attendee',
    icon: <Users className="text-tertiary" size={18} />,
    // TODO: Add CORRECT link
    link: ORGANIZER_APP_ROUTES.attendees.root()
  }
];

export const OrganizerQuickLinks = () => {
  const router = useRouter();

  return (
    <Card className="w-full">
      <CardHeader className="relative">
        <div className="flex justify-between gap-2 items-center">
          <CardDescription className="text-[0.81rem] font-medium text-foreground flex items-center gap-1">
            <span>Quick Links</span>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 11L10 15L14 19" stroke="black" strokeWidth={2} />
              <path
                d="M4.20577 12.75C3.21517 11.8921 2.8184 10.8948 3.077 9.91263C3.3356 8.9305 4.23511 8.01848 5.63604 7.31802C7.03696 6.61756 8.86101 6.1678 10.8253 6.0385C12.7895 5.9092 14.7842 6.10758 16.5 6.60289C18.2158 7.09819 19.5567 7.86273 20.3149 8.77792C21.0731 9.69312 21.2061 10.7078 20.6933 11.6647C20.1806 12.6215 19.0507 13.467 17.4789 14.0701C15.9071 14.6731 13.9812 15 12 15"
                stroke="black"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-1">
        <div className="flex flex-col gap-4">
          {QUICK_LINKS.map((ql) => (
            <Button
              variant="ghost"
              className="flex items-center justify-start gap-2 rounded-lg p-2.5 bg-gray-light/40 h-[3.88rem] border border-gray-light"
              key={ql.title}
              onClick={() => {
                router.push(ql.link);
              }}
            >
              {ql.icon}
              <span className="flex flex-col gap-0.5 text-left">
                <span className="font-medium text-[0.81rem] text-foreground">
                  {ql.title}
                </span>
                <span className="text-[0.68rem] text-foreground/60">
                  {ql.message}
                </span>
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
