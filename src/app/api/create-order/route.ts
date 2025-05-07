import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: 'rzp_test_AZXUgY3fSW20EV',
  key_secret: 'sQPe8jiTh46im5sYciBHpMMb',
});

export async function POST(req: NextRequest) {
  try {
    const { amount, assetId, title } = await req.json();

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: { assetId, title },
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Order creation failed' }, { status: 500 });
  }
} 