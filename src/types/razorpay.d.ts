declare namespace Razorpay {
  interface Options {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: PaymentResponse) => void;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    theme?: {
      color?: string;
    };
  }

  interface PaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }

  interface RazorpayInstance {
    open(): void;
  }
}

interface Window {
  Razorpay: {
    new (options: Razorpay.Options): Razorpay.RazorpayInstance;
  };
} 