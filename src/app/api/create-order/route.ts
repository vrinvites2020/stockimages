import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Razorpay instance configuration
 * Uses environment variables for API credentials
 */
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY as string,
    key_secret: process.env.RAZORPAY_SECRET as string,
});

/**
 * POST handler for creating Razorpay orders
 * Converts amount to paise and creates order with asset details
 * Returns order details for frontend payment processing
 */
export async function POST(req: NextRequest) {
  try {
    const { amount, assetId, title, email, phone, city } = await req.json();

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: { assetId, title, email, phone, city },
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Order creation failed' }, { status: 500 });
  }
} 