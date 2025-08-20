'use client';

import { ContentCard } from '@/app/core/shared/components/molecules';
import { useOrganizerExhibitorById } from '../../hooks';
import { cn } from '@/app/core/shared/utils';
import Image from 'next/image';
import { ImagePlaceholder } from '@/app/core/shared/components/atoms/image-placeholder';
import { Globe, Mail } from 'lucide-react';

export const ExhibitorProfileInformation = ({ id }: { id: string }) => {
  const { exhibitor } = useOrganizerExhibitorById(id);

  const hasLogo = !!exhibitor?.logo;

  const contactInformation = [
    {
      label: 'Website',
      type: 'website',
      icon: <Globe size={12} />,
      value: exhibitor?.website ?? 'N/A'
    },
    {
      label: 'Email',
      type: 'email',
      icon: <Mail size={12} />,
      value: exhibitor?.email ?? 'N/A'
    }
  ];

  const mapStatus = {
    owner: {
      bg: 'bg-purple-600',
      text: 'text-white'
    },
    member: {
      bg: 'bg-amber-800',
      text: 'text-white'
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* About */}
      <ContentCard
        title="About"
        description={exhibitor?.publicDescription ?? 'No description available'}
      />
      {/* Contact Information */}
      <ContentCard title="Contact Information">
        <div className="flex flex-col gap-5 mt-3">
          <div className="flex items-center gap-2">
            {hasLogo ? (
              <Image
                src={exhibitor?.logo as string}
                alt={exhibitor?.exhibitorCompanyName ?? 'Exhibitor Logo'}
                width={48}
                height={48}
                className="object-contain w-12 h-12 rounded-[6px]"
              />
            ) : (
              <ImagePlaceholder
                label="Logo"
                className="w-12 h-12 rounded-[6px] text-xs"
              />
            )}

            <p className="text-sm font-medium text-foreground">
              {exhibitor?.exhibitorName ?? 'N/A'}
            </p>
            <span
              className={cn(
                'px-2 h-[26px] w-[94px] rounded-[23px] text-xs flex justify-center items-center border capitalize',
                mapStatus.owner.bg,
                mapStatus.owner.text
              )}
            >
              Booth owner
            </span>
          </div>

          <div className="mt-2 flex flex-col gap-2 justify-center">
            {contactInformation.map((item, index) => {
              const key = `exhibitor-${index}-${item.label}`;
              const value =
                item.type === 'email' ? `mailto:${item.value}` : item.value;
              return (
                <div key={key} className="flex items-center gap-[3px]">
                  <span>{item.icon}</span>
                  <span className="text-sm font-normal text-light-blue-2">
                    <a href={value}>{item.value ?? 'N/A'}</a>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </ContentCard>
    </div>
  );
};
