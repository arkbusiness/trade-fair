'use client';
import {
  Button,
  ErrorText,
  Input,
  Textarea
} from '@/app/core/shared/components/atoms';
import { LoadingButton, Modal } from '@/app/core/shared/components/molecules';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  isPossiblePhoneNumber,
  parsePhoneNumber
} from 'react-phone-number-input';
import * as yup from 'yup';
import { IOrderItem, useOrderById } from '../../hooks';
import { orderService } from '../../services';

interface OrderDeliveryFormProps {
  isOpen: boolean;
  orderId: string;
  selectedOrderTracking: IOrderItem['tracking'] | null;
  onClose: () => void;
}

const validationSchema = yup.object().shape({
  courier: yup.string().required('Courier name is required'),
  name: yup.string().required('Dispatcher name is required'),
  code: yup.string(),
  phone: yup
    .string()
    .trim()
    .test({
      name: 'phone',
      message: 'Enter a valid phone number',
      test(value, ctx) {
        if (!value) {
          return ctx.createError({
            message: 'Phone number is required'
          });
        }

        return isPossiblePhoneNumber(value);
      }
    })
    .required('Phone number is required'),
  note: yup.string()
});

type OrderDeliveryFormType = yup.InferType<typeof validationSchema>;

export const OrderDeliveryForm = ({
  isOpen,
  selectedOrderTracking,
  orderId,
  onClose
}: OrderDeliveryFormProps) => {
  const { refetchOrder } = useOrderById(orderId);
  const mutation = useCustomMutation();

  const form = useForm<OrderDeliveryFormType>({
    resolver: yupResolver(validationSchema),
    values: {
      courier: selectedOrderTracking?.courier || '',
      name: selectedOrderTracking?.name || '',
      code: selectedOrderTracking?.code || '',
      phone: selectedOrderTracking?.phone || '',
      note: selectedOrderTracking?.note || ''
    },
    mode: 'onChange'
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = form;

  const handleCloseModal = () => {
    if (mutation.isPending) return;
    reset();
    refetchOrder();
    onClose();
  };

  const onSubmit = (data: OrderDeliveryFormType) => {
    if (!orderId) return;

    const formValues = {
      ...data,
      note: data.note || '',
      phone: parsePhoneNumber(data.phone)?.number as string
    };

    mutation.mutate(orderService.updateTracking(orderId, formValues), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('Delivery details updated successfully.');
        handleCloseModal();
      }
    });
  };

  const {
    courier: courierError,
    name: nameError,
    code: codeError,
    phone: phoneError,
    note: noteError
  } = errors;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      title="Update Delivery Details"
      description=""
      contentClassName="px-0 pb-0 overflow-hidden"
      headerClassName="px-6"
    >
      <form
        className="flex flex-col gap-[1.86rem] w-full text-left relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset
          className="w-full px-4 flex flex-col gap-[1.86rem]"
          disabled={mutation.isPending}
        >
          <div className="grid lg:grid-cols-2 gap-[1.86rem]">
            {/* Courier Name */}
            <div>
              <Input
                label="Courier name"
                placeholder="e.g. DHL Express"
                hasError={!!courierError?.message?.length}
                {...register('courier')}
              />
              <ErrorText message={courierError?.message} />
            </div>

            {/* Tracking code */}
            <div>
              <Input
                label="Tracking code"
                placeholder="e.g.  ABC-EC-123469"
                hasError={!!codeError?.message?.length}
                {...register('code')}
              />
              <ErrorText message={codeError?.message} />
            </div>
          </div>

          {/* Dispatcher Name */}
          <div>
            <Input
              label="Dispatcher name"
              placeholder="e.g. John Doe"
              hasError={!!nameError?.message?.length}
              {...register('name')}
            />
            <ErrorText message={nameError?.message} />
          </div>

          {/* Dispatcher Phone */}
          <div>
            <Input
              label="Dispatcher phone"
              placeholder="e.g. +123456789"
              hasError={!!phoneError?.message?.length}
              {...register('phone')}
            />
            <ErrorText message={phoneError?.message} />
          </div>

          {/* Dispatcher Note */}
          <div>
            <Textarea
              label="Dispatcher note (Optional)"
              placeholder="e.g. Enter note"
              rows={8}
              {...register('note')}
            />
            <ErrorText message={noteError?.message} />
          </div>
        </fieldset>
        <div className="mt-[5.19rem] w-full flex justify-between bg-gray-light-3 py-5 px-6">
          <Button
            variant="outline"
            className="gap-[0.5rem] flex items-center h-8"
            type="button"
            onClick={handleCloseModal}
            disabled={mutation.isPending}
          >
            <span>Cancel</span>
          </Button>

          <LoadingButton
            variant="tertiary"
            className="gap-[0.5rem] flex items-center h-8"
            type="submit"
            isLoading={mutation.isPending}
            disabled={mutation.isPending}
          >
            <span>Update</span>
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
};
