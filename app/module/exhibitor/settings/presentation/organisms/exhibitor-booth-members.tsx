'use client';

import { Button } from '@/app/core/shared/components/atoms';
import { useState } from 'react';
import {
  ExhibitorBoothMemberForm,
  ExhibitorBoothMembersTable
} from '../molecules';
import { useExhibitorBoothMembers } from '../../hooks/use-settings';
import { useQueryFilters } from '@/app/core/shared/hooks';

enum ModalType {
  ADD_BOOTH_MEMBER = 'ADD_BOOTH_MEMBER',
  NONE = 'NONE'
}

export const ExhibitorBoothMembers = () => {
  const { filter } = useQueryFilters(['page']);
  const { refetchBoothMembers } = useExhibitorBoothMembers(filter);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);

  const handleCloseModal = () => {
    setModalType(ModalType.NONE);
    refetchBoothMembers();
  };

  return (
    <>
      <ExhibitorBoothMemberForm
        isOpen={modalType === ModalType.ADD_BOOTH_MEMBER}
        onClose={handleCloseModal}
      />

      <div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-foreground">
              Booth Members
            </h3>
            <p className="text-sm font-light">Manage and add booth members.</p>
          </div>

          <div>
            <Button
              variant="tertiary"
              className="h-[35px]"
              onClick={() => setModalType(ModalType.ADD_BOOTH_MEMBER)}
            >
              Add Booth Member
            </Button>
          </div>
        </div>

        <ExhibitorBoothMembersTable />
      </div>
    </>
  );
};
