import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planId } = await req.json();

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12, // 12 months subscription
      quantity: 1,
      notes: { userId },
    });

    return NextResponse.json(subscription);
  } catch (err) {
    console.error('Subscription error:', err);
    return NextResponse.json({ error: 'Subscription creation failed' }, { status: 500 });
  }
} 