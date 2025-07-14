import { useState, useEffect } from 'react';
import Script from 'next/script';

/**
 * Props interface for RazorpayCheckoutButton component
 */
interface RazorpayCheckoutButtonProps {
  amount: number;        // Payment amount in rupees
  assetId: string;       // Unique identifier for the asset being purchased
  title: string;         // Asset title for payment description
  onPaymentSuccess?: () => void;  // Callback function after successful payment
  triggerPayment?: boolean; // If true, triggers payment programmatically
  onTriggerHandled?: () => void; // Called after payment is triggered
  hideButton?: boolean; // If true, hides the default button
  email: string;
  phone: string;
  studioName: string;
  city: string;
}

/**
 * RazorpayCheckoutButton component
 * Handles payment processing through Razorpay gateway
 * Creates orders on backend and opens Razorpay checkout modal
 */
export default function RazorpayCheckoutButton({ amount, assetId, title, email, phone, studioName, city, onPaymentSuccess, triggerPayment, onTriggerHandled, hideButton }: RazorpayCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  /**
   * Initiates payment process
   * Creates order on backend and opens Razorpay checkout
   */
  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create order on backend
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount, // in rupees
          assetId,
          title,
          email,
          phone,
          studioName,
          city,
        }),
      });
      const data = await res.json();

      // 2. Open Razorpay checkout
      const options = {
        // Store your Razorpay key in .env.local as NEXT_PUBLIC_RAZORPAY_KEY
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY as string,
        amount: data.amount, // in paise
        currency: data.currency,
        name: 'VR Visual Magics',
        description: title,
        order_id: data.id,
        handler: function () {
          if (onPaymentSuccess) onPaymentSuccess();
        },
        prefill: {
          name: studioName,
          email: email,
          contact: phone,
        },
        theme: { color: '#2563EB' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Error initializing payment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Effect to trigger payment programmatically
  useEffect(() => {
    if (triggerPayment) {
      handlePayment().finally(() => {
        if (onTriggerHandled) onTriggerHandled();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerPayment]);

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      {!hideButton && (
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`btn-primary px-6 py-2 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Processing...' : 'Buy Now'}
        </button>
      )}
    </>
  );
} 