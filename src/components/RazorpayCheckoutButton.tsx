import { useState } from 'react';
import Script from 'next/script';

interface RazorpayCheckoutButtonProps {
  amount: number; // in rupees
  assetId: string;
  title: string;
}

export default function RazorpayCheckoutButton({ amount, assetId, title }: RazorpayCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

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
        }),
      });
      const data = await res.json();

      // 2. Open Razorpay checkout
      const options = {
        key: 'rzp_test_AZXUgY3fSW20EV', // Use env var in production!
        amount: data.amount, // in paise
        currency: data.currency,
        name: 'Your Project Name',
        description: title,
        order_id: data.id,
        handler: function () {
          alert('Payment initiated! You will receive access once the payment is confirmed.');
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
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

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button
        onClick={handlePayment}
        disabled={loading}
        className={`btn-primary px-6 py-2 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Processing...' : 'Buy Now'}
      </button>
    </>
  );
} 