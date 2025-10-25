import { ArrowLeftRight } from 'lucide-react';
import { LoadingButton } from '../molecules';
import { useCustomMutation } from '../../hooks/use-mutate';
import { errorHandler } from '../../utils';
import toast from 'react-hot-toast';
import {
  RateConversion,
  useCurrencyRateSlice
} from '../../slice/currency-rate-slice';

interface CurrencyConverterProps {
  productCurrency: string;
  userCurrency: string;
  ratesEndpoint: string;
}

export const CurrencyConverter = ({
  productCurrency,
  userCurrency,
  ratesEndpoint
}: CurrencyConverterProps) => {
  const mutation = useCustomMutation<{ conversionRates: RateConversion }>();
  const { saveRates } = useCurrencyRateSlice();

  const handleConversion = () => {
    mutation.mutate(
      {
        url: ratesEndpoint,
        method: 'GET'
      },
      {
        onError(error) {
          const errorMessage = errorHandler(error);
          toast.error(errorMessage);
        },
        onSuccess(response) {
          toast.success('Conversion successful');
          if (response.conversionRates) {
            saveRates(response.conversionRates);
          }
        }
      }
    );
  };

  if (productCurrency === userCurrency) return;
  return (
    <div className="flex justify-between items-center gap-[1.86rem] py-2.5 px-3.5 border  rounded-[6px]">
      <LoadingButton
        variant="primary"
        isLoading={mutation.isPending}
        onClick={handleConversion}
      >
        Convert
      </LoadingButton>
      <div className="flex items-center gap-4">
        <p className="font-medium">{productCurrency}</p>
        <ArrowLeftRight className="text-light-blue" size={16} />
        <p className="font-medium">{userCurrency}</p>
      </div>
    </div>
  );
};
