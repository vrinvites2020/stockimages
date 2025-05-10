import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'supersecret123';

  const rawBody = await req.text();
  const signature = req.headers.get('x-razorpay-signature') || '';

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');

  if (signature !== expectedSignature) {
    console.warn('⚠️ Invalid webhook signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === 'payment.captured') {
    const payment = event.payload.payment.entity;
    console.log('✅ Payment captured:', payment);

    // TODO: Store this in DB, unlock access, etc.
    // Example:
    // await unlockAssetForUser(payment.notes.assetId, payment.email);

    return NextResponse.json({ status: 'ok' });
  }

  return NextResponse.json({ status: 'ignored' });
}
