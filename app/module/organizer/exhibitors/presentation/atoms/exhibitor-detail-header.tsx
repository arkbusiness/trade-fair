'use client';

import { GoBackButton } from '@/app/core/shared/components/atoms';
import {
  ConfirmationModal,
  IconButton,
  LoadingButton,
  OverlaySpinner
} from '@/app/core/shared/components/molecules';
import { ORGANIZER_APP_ROUTES } from '@/app/core/shared/constants';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { Printer, Trash } from 'lucide-react';
import { useState } from 'react';
import { organizerExhibitorsService } from '../../services';
import { errorHandler, printElement } from '@/app/core/shared/utils';
import toast from 'react-hot-toast';
import { useRouter } from 'nextjs-toploader/app';
import { getQueryClient } from '@/app/core/shared/lib';

export const ExhibitorDetailHeader = ({ id }: { id: string }) => {
  const queryClient = getQueryClient();
  const router = useRouter();
  const mutation = useCustomMutation();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handlePrint = () => {
    printElement({
      elementId: 'exhibitor-detail',
      title: 'Exhibitor Details'
    });
  };

  const handleDelete = () => {
    mutation.mutate(organizerExhibitorsService.deleteExhibitor(id), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('Exhibitor deleted successfully.');
        queryClient.invalidateQueries({
          queryKey: [...organizerExhibitorsService.getExhibitors().queryKey]
        });
        router.push(ORGANIZER_APP_ROUTES.exhibitors.root());
      }
    });
  };

  return (
    <>
      {mutation.isPending && <OverlaySpinner />}
      <ConfirmationModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Exhibitor"
        description="Are you sure you want to delete this exhibitor?"
      />
      <div className="flex justify-between items-center gap-5 flex-wrap">
        <GoBackButton
          title="Back to Exhibitors"
          route={ORGANIZER_APP_ROUTES.exhibitors.root()}
        />
        <div className="max-w-[21.56rem] w-full flex flex-wrap gap-2 justify-end">
          {/* Print */}
          <IconButton
            variant="ghost"
            className="hover:bg-transparent hover:text-foreground gap-1.5 px-4 py-1.5 h-auto"
            onClick={handlePrint}
          >
            <Printer className="text-foreground" />
            <span className="font-light text-[0.81rem] text-foreground">
              Print
            </span>
          </IconButton>

          {/* Delete */}
          <LoadingButton
            variant="ghost"
            className="hover:bg-transparent hover:text-primary gap-1.5 px-4 py-1.5 h-auto"
            onClick={() => setOpenDeleteModal(true)}
            isLoading={mutation.isPending}
          >
            <Trash className="stroke-tertiary" />
            <span className="font-light text-[0.81rem] text-tertiary">
              Delete
            </span>
          </LoadingButton>
        </div>
      </div>
    </>
  );
};
