import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Razorpay from 'razorpay';

/**
 * Global window interface extension for Razorpay
 */
declare global {
  interface Window {
    Razorpay: new (options: Razorpay.Options) => Razorpay.RazorpayInstance;
  }
}

/**
 * Props interface for SubscriptionCheckout component
 */
interface SubscriptionCheckoutProps {
  planId: string;        // Subscription plan identifier
  onSuccess?: (subscriptionId: string) => void;  // Success callback
  onError?: (error: Error) => void;              // Error callback
}

/**
 * SubscriptionCheckout component
 * Handles subscription creation and payment through Razorpay
 * Integrates with Clerk for user authentication
 */
export default function SubscriptionCheckout({
  planId,
  onSuccess,
  onError,
}: SubscriptionCheckoutProps) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  /**
   * Initiates subscription process
   * Creates subscription on backend and opens Razorpay checkout
   */
  const startSubscription = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      const options: Razorpay.Options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || '',
        name: 'Stock Image Access',
        description: 'Yearly Subscription',
        handler: function (response: Razorpay.PaymentResponse) {
          if (onSuccess) {
            onSuccess(response.razorpay_payment_id);
          }
        },
        prefill: {
          name: user?.fullName || '',
          email: user?.primaryEmailAddress?.emailAddress || '',
        },
        theme: { color: '#6366f1' },
        amount: 0,
        currency: 'INR',
        order_id: '',
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Subscription error:', error);
      if (onError) {
        onError(error as Error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={startSubscription}
      disabled={loading}
      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
    >
      {loading ? 'Processing...' : 'Subscribe Now'}
    </button>
  );
} 