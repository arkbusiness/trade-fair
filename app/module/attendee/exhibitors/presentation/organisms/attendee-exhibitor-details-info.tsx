'use client';

import { ContentCard } from '@/app/core/shared/components/molecules';
import { CircleAlert, Globe, Mail, Phone } from 'lucide-react';
import {
  useAttendeeExhibitorById,
  useAttendeeExhibitorScanBooth
} from '../../api';

export const AttendeeExhibitorDetailsInfo = ({ id }: { id: string }) => {
  const { exhibitor } = useAttendeeExhibitorById(id);
  const { isScanned } = useAttendeeExhibitorScanBooth(id);

  const contactInformation = [
    {
      label: 'Website',
      type: 'website',
      icon: <Globe size={12} />,
      value: exhibitor?.websiteUrl || 'N/A'
    },
    {
      label: 'Phone',
      type: 'phone',
      icon: <Phone size={12} />,
      value: exhibitor?.contactPhone || 'N/A'
    },
    {
      label: 'Email',
      type: 'email',
      icon: <Mail size={12} />,
      value: exhibitor?.contactEmail || 'N/A'
    }
  ];

  return (
    <div className="flex flex-col gap-6 mt-7.5">
      {/* About */}
      <ContentCard title="About">
        <div className="pb-10">
          <p className="mt-4 text-sm">
            {exhibitor?.publicDescription ?? 'No description available'}
          </p>
        </div>
      </ContentCard>
      {/* Contact Information */}
      <ContentCard title="Contact Information">
        <div className="flex flex-col gap-5 mt-3 pb-10">
          <div className="mt-2 flex flex-col gap-5 justify-center">
            {contactInformation.map((item, index) => {
              const key = `exhibitor-${index}-${item.label}`;

              let value = '';

              if (item.type === 'email') {
                value = `mailto:${item.value}`;
              } else if (item.type === 'phone') {
                value = `tel:${item.value}`;
              } else {
                value = item.value;
              }

              return (
                <div key={key} className="flex items-center gap-4">
                  <span>{item.icon}</span>
                  <span className="text-sm font-normal text-light-blue-2">
                    <a href={value}>{item.value}</a>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </ContentCard>

      {!isScanned && (
        <div className="py-5 px-4 rounded-lg bg-gray-light-4 flex gap-3">
          <div>
            <CircleAlert
              size={20}
              className="text-background fill-destructive"
            />
          </div>
          <p className="max-w-[470px] w-full font-normal">
            Scan QR code at the booth stand with your mobile phone to unlock
            chat with this exhibitor
          </p>
        </div>
      )}
    </div>
  );
};
