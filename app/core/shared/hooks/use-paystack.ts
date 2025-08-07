import useScript from './use-script';

interface CustomWindow extends Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Paystack?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PaystackPop?: any;
}

declare const window: CustomWindow;

interface IPaystackProps {
  data: {
    email: string;
    amount: number;
    publicKey: string;
    plan: string;
    metadata: {
      company_name: string;
      description: string;
      name: string;
      email: string;
      oldSubscriptionCode?: string;
      newSubscriptionCode?: string;
      phone_number: string;
      custom_fields: {
        display_name: string;
        variable_name: string;
        value: string;
      }[];
    };
  };
  onClose(): void;
  onSuccess(reference: string): void;
}

export const usePaystack = () => {
  const status = useScript(`https://js.paystack.co/v2/inline.js`, {
    removeOnUnmount: false,
    id: 'Paystack'
  });

  function initializePaystack({ data, onClose, onSuccess }: IPaystackProps) {
    if (status !== 'ready' || !window.Paystack) return;
    const { email, amount, publicKey, metadata, plan } = data;

    const paystackInstance = new window.PaystackPop.setup({
      email,
      amount,
      plan,
      key: publicKey,
      metadata,
      onClose,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: function (response: any) {
        onSuccess(response.reference);
      }
    });

    paystackInstance.openIframe();
  }

  return { initializePaystack, isLoadingPaystack: status === 'loading' };
};

export default usePaystack;
