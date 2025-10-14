'use client';

import { Card, CardContent } from '@/app/core/shared/components/atoms';
import { ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { cn, errorHandler } from '@/app/core/shared/utils';
import { Heart, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { attendeeExhibitorsService } from '../../services';

interface IAttendeeExhibitorCard {
  imageUrl: string;
  exhibitorId: string;
  companyName: string;
  boothNumber: string;
  description: string;
  isLiked?: boolean;
  allowNavigation?: boolean;
  handleRefetchExhibitors: () => void;
}

export const AttendeeExhibitorCard = ({
  imageUrl,
  exhibitorId,
  companyName,
  boothNumber,
  description,
  isLiked,
  allowNavigation = false,
  handleRefetchExhibitors
}: IAttendeeExhibitorCard) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const mutation = useCustomMutation();
  const router = useRouter();

  const handleGoToExhibitor = (exhibitorId: string) => {
    if (allowNavigation) {
      router.push(ATTENDEE_APP_ROUTES.exhibitors.detail(exhibitorId));
    }
  };

  const handleAddToFavorite = () => {
    setIsLikedState((prev) => !prev);
    mutation.mutate(attendeeExhibitorsService.addToFavorite(exhibitorId), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
        setIsLikedState(false);
      },
      onSuccess() {
        toast.success('Exhibitor added to favourite');
        handleRefetchExhibitors();
      }
    });
  };

  const handleRemoveFromFavorite = () => {
    setIsLikedState((prev) => !prev);
    mutation.mutate(attendeeExhibitorsService.removeFromFavorite(exhibitorId), {
      onError(error) {
        const errorMessage = errorHandler(error);
        setIsLikedState(false);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('Exhibitor removed from favourite');
        handleRefetchExhibitors();
      }
    });
  };

  const handleClickFavourite = () => {
    if (isLikedState) {
      handleRemoveFromFavorite();
    } else {
      handleAddToFavorite();
    }
  };

  const isMutating = mutation.isPending;

  return (
    <Card
      className="pt-0 cursor-pointer"
      onClick={() => handleGoToExhibitor(exhibitorId)}
    >
      <div className="max-h-[13.5rem] overflow-hidden h-full py-0">
        <Image
          src={imageUrl || './images/empty-image.svg'}
          alt={companyName}
          width={240}
          height={135}
          className="object-contain h-full w-full"
        />
      </div>
      <CardContent>
        <div className="mt-3 mb-4 flex flex-col gap-3 px-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold">{companyName}</h3>
              <div className="flex items-center gap-1 mt-1 relative -left-0.5">
                <MapPin className="text-tertiary" size={13} />
                <span className="font-medium text-tertiary text-xs">
                  {boothNumber || 'N/A'}
                </span>
              </div>
            </div>
            <button onClick={handleClickFavourite} disabled={isMutating}>
              <Heart
                size={16}
                className={cn({
                  'text-golden-yellow fill-golden-yellow':
                    (isLiked && !isMutating) || isLikedState
                })}
              />
            </button>
          </div>
          <p className="text-xs font-medium line-clamp-2 mt-2">
            {description || 'N/A'}
          </p>
          <div></div>
        </div>
      </CardContent>
    </Card>
  );
};
