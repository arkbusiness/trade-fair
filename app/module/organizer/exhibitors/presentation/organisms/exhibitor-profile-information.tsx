'use client';

import { ContentCard } from '@/app/core/shared/components/molecules';
import { useOrganizerExhibitorById } from '../../hooks';
import { cn } from '@/app/core/shared/utils';
import Image from 'next/image';
import { ImagePlaceholder } from '@/app/core/shared/components/atoms/image-placeholder';
import { Globe, Mail } from 'lucide-react';

export const ExhibitorProfileInformation = ({ id }: { id: string }) => {
  const { exhibitor } = useOrganizerExhibitorById(id);
  const members = exhibitor?.boothMembersList ?? [];
  const hasMembers = members?.length > 0;

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

  const mapMemberType = {
    owner: {
      bg: 'bg-purple-primary',
      text: 'text-white'
    },
    member: {
      bg: 'bg-brownish',
      text: 'text-white'
    }
  };

  return (
    <div className="flex flex-col gap-6">
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
                mapMemberType.owner.bg,
                mapMemberType.owner.text
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
                <div key={key} className="flex items-center gap-[5px]">
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

      {/* Booth Members */}
      <ContentCard title="Other Members">
        <div className="flex gap-x-10 gap-y-12 mt-3 flex-wrap pb-10">
          {members?.map((item, index) => {
            const memberHasEmail = !!item.email;
            const key = `member-${index}-${item.id}`;

            return (
              <div key={key} className="flex justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {item.username}
                    </p>
                    <span
                      className={cn(
                        'px-2 h-[23px] w-[68px] rounded-[20px] text-xs flex justify-center items-center border capitalize',
                        mapMemberType.member.bg,
                        mapMemberType.member.text
                      )}
                    >
                      Member
                    </span>
                  </div>

                  <div className="flex items-center gap-[5px] mt-1">
                    <Mail size={12} />
                    <span className="text-sm font-normal text-light-blue-2">
                      {memberHasEmail ? (
                        <a href={item.email}>{item.email}</a>
                      ) : (
                        'N/A'
                      )}
                    </span>
                  </div>
                </div>
                <div></div>
              </div>
            );
          })}

          {!hasMembers && (
            <p className="text-sm flex justify-center">No members found</p>
          )}
        </div>
      </ContentCard>
    </div>
  );
};
