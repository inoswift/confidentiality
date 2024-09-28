import Stripe from 'stripe';
import dotenv from 'dotenv';
import logger from './logger';  // Using logger to log important events
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to create a Stripe Checkout Session for Subscription Renewal or One-Time Purchase
export async function createCheckoutSession(userId, fileId, amount = 500, purchaseType = 'one-time') {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: purchaseType === 'subscription' ? 'Subscription Renewal' : 'One-Time Purchase',
              description: `Purchase for file access - File ID: ${fileId}`,
            },
            unit_amount: amount,  // Amount in cents (500 = $5.00)
          },
          quantity: 1,
        },
      ],
      mode: purchaseType === 'subscription' ? 'subscription' : 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        userId,
        fileId,
        purchaseType,  // Added purchaseType to metadata for easy identification
      },
    });

    logger.info(`Stripe checkout session created for userId: ${userId}, fileId: ${fileId}, type: ${purchaseType}`);
    return session.id;  // Return the session ID to be used in the frontend
  } catch (error) {
    logger.error(`Error creating checkout session for userId: ${userId}, fileId: ${fileId} - ${error.message}`);
    throw new Error('Unable to create checkout session');
  }
}

// Function to verify the webhook signature and handle Stripe events
export async function handleWebhookEvent(req, res) {
  const sig = req.headers['stripe-signature'];
  const rawBody = req.rawBody;

  try {
    const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const { userId, fileId, purchaseType } = session.metadata;

        // Update the subscription or process one-time purchase in your database here
        if (purchaseType === 'subscription') {
          await updateSubscription(userId, fileId);
        } else {
          await processOneTimePurchase(userId, fileId);
        }

        logger.info(`Payment completed for userId: ${userId}, fileId: ${fileId}, type: ${purchaseType}`);
        res.status(200).json({ received: true });
        break;
      }
      case 'invoice.payment_failed': {
        const session = event.data.object;
        const { userId, fileId } = session.metadata;

        // Mark the subscription as failed in your database
        await markSubscriptionAsFailed(userId, fileId);

        logger.warn(`Payment failed for userId: ${userId}, fileId: ${fileId}`);
        res.status(200).json({ received: true });
        break;
      }
      default:
        logger.warn(`Unhandled event type: ${event.type}`);
        res.status(400).json({ message: 'Event not handled' });
    }
  } catch (error) {
    logger.error(`Error verifying webhook: ${error.message}`);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
}

// Utility function to extend the user's subscription
async function updateSubscription(userId, fileId) {
  // Implement your logic to update the subscription in the database
  console.log(`Subscription for userId ${userId} and fileId ${fileId} extended`);
}

// Utility function to process one-time purchase
async function processOneTimePurchase(userId, fileId) {
  // Implement your logic for one-time purchase in the database
  console.log(`One-time purchase for userId ${userId} and fileId ${fileId} processed`);
}

// Utility function to mark the user's subscription as failed
async function markSubscriptionAsFailed(userId, fileId) {
  // Implement your logic to handle payment failures
  console.log(`Subscription for userId ${userId} and fileId ${fileId} marked as failed`);
}