import Stripe from 'stripe';
import db from '../../db';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  const buf = await req.rawBody;

  try {
    const event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;

        // Handle subscription or one-time payment completion
        if (session.mode === 'subscription') {
          const { userId } = session.metadata;
          await db.query('UPDATE subscriptions SET status = \'Active\' WHERE user_id = $1', [userId]);
        } else if (session.mode === 'payment') {
          const { fileId, userId } = session.metadata;
          await db.query('INSERT INTO file_access (user_id, file_id) VALUES ($1, $2)', [userId, fileId]);
        }

        res.status(200).json({ received: true });
        break;
      }

      case 'invoice.payment_failed': {
        // Handle payment failure
        const session = event.data.object;
        const { userId } = session.metadata;
        await db.query('UPDATE subscriptions SET status = \'Failed\' WHERE user_id = $1', [userId]);

        res.status(200).json({ received: true });
        break;
      }

      default:
        res.status(200).json({ message: `Unhandled event type ${event.type}` });
    }
  } catch (error) {
    res.status(400).json({ message: `Webhook error: ${error.message}` });
  }
}