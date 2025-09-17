'use client';

import { Button } from '@/app/core/shared/components/atoms';
import { useSetParams } from '@/app/core/shared/hooks';
import { Clock3 } from 'lucide-react';

export const AppointmentsHeader = () => {
  const { setParam } = useSetParams();

  const handleOpenModal = () => {
    setParam('createSlot', '1');
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          variant="tertiary"
          className="flex gap-x-[0.63rem]"
          onClick={handleOpenModal}
        >
          <Clock3 size={16} />
          <span>Create time slot</span>
        </Button>
      </div>
    </>
  );
};
