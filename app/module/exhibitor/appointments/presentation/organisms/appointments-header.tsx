'use client';

import { Button } from '@/app/core/shared/components/atoms';
import { Clock3 } from 'lucide-react';

export const AppointmentsHeader = () => {
  // const [showModal, setShowModal] = useState(false);

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  // const handleOpenModal = () => {
  //   setShowModal(true);
  // };

  return (
    <>
      <div className="flex justify-end">
        <Button
          variant="tertiary"
          className="flex gap-x-[0.63rem]"
          // onClick={handleOpenModal}
        >
          <Clock3 size={16} />
          <span>Create time slot</span>
        </Button>
      </div>
    </>
  );
};
