/**
 * TypeScript declarations for Razorpay payment gateway integration
 * Provides type safety for Razorpay API interactions
 */
declare namespace Razorpay {
  /**
   * Configuration options for Razorpay payment instance
   */
  interface Options {
    key: string;                    // Razorpay public key
    amount: number;                 // Payment amount in smallest currency unit (paise for INR)
    currency: string;               // Currency code (e.g., 'INR')
    name: string;                   // Merchant name displayed on payment form
    description: string;            // Payment description
    order_id: string;               // Unique order identifier
    handler: (response: PaymentResponse) => void;  // Payment success callback
    prefill?: {                     // Optional pre-filled customer details
      name?: string;
      email?: string;
      contact?: string;
    };
    theme?: {                       // Optional UI theme customization
      color?: string;
    };
  }

  /**
   * Response object received after successful payment
   */
  interface PaymentResponse {
    razorpay_payment_id: string;    // Unique payment identifier
    razorpay_order_id: string;      // Order identifier
    razorpay_signature: string;     // Payment signature for verification
  }

  /**
   * Razorpay instance methods
   */
  interface RazorpayInstance {
    open(): void;                   // Opens the payment modal
  }
}

/**
 * Global window object extension for Razorpay
 */
interface Window {
  Razorpay: {
    new (options: Razorpay.Options): Razorpay.RazorpayInstance;
  };
} 