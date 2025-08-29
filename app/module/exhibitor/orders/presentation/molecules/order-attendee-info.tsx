import { LinkButton } from '@/app/core/shared/components/atoms';
import { DownloadIcon } from 'lucide-react';

interface OrderAttendeeInfoProps {
  name: string;
  email: string;
  phone: string;
  paymentSlip: string | null;
}

export const OrderAttendeeInfo = ({
  name,
  email,
  phone,
  paymentSlip
}: OrderAttendeeInfoProps) => {
  const hasPaymentSlip = !!paymentSlip;
  return (
    <div className="py-5">
      <h4 className="font-semibold text-xs uppercase text-foreground underline">
        Attendee Information
      </h4>
      <div className="flex gap-2 text-sm flex-col mt-2">
        <p>
          <span className="font-medium text-foreground">Name:</span> {name}
        </p>
        <p>
          <span className="font-medium text-foreground">Email:</span> {email}
        </p>
        <p>
          <span className="font-medium text-foreground">Phone:</span> {phone}
        </p>
        {hasPaymentSlip && (
          <div className="max-w-[12.19rem] w-full">
            <LinkButton
              variant="highlight"
              className="flex gap-x-[0.63rem]"
              download
              target="_blank"
              rel="noopener noreferrer"
              href={paymentSlip}
            >
              <DownloadIcon size={16} />
              <span>Download Payment Slip</span>
            </LinkButton>
          </div>
        )}
      </div>
    </div>
  );
};
