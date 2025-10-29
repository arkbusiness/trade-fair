'use client';

import { ProfileImageUploader } from '@/app/core/shared/components/molecules';
import { useAttendeeUser } from '@/app/core/shared/hooks/api';

interface IAttendeeSettingsHeader {
  handleImageUpload: (file: File) => void;
}

export const AttendeeSettingsHeader = ({
  handleImageUpload
}: IAttendeeSettingsHeader) => {
  const { user } = useAttendeeUser();

  return (
    <div className="relative">
      <div className="w-full h-[240px] bg-gradient-to-r from-[#F97316] to-[#DC2626]" />
      <div className="flex gap-2 flex-col sm:flex-row max-w-[363px] w-full px-6 md:px-12">
        <div className="w-[120px] h-[120px] rounded-[12px] sm:relative -top-6">
          <ProfileImageUploader
            className="w-[clamp(100px,_30vw,_120px)] h-[clamp(100px,_30vw,_120px)] border-4"
            user={{
              photoUrl: user?.logoUrl || '',
              name: user?.contactName
            }}
            onImageUpload={(file: File) => {
              handleImageUpload(file);
            }}
          />
        </div>
        <div className="text-left mt-4 w-full">
          <p className="text-lg font-bold text-foreground">
            {user?.contactName ?? 'N/A'}
          </p>
          <p className="text-sm font-light">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};
