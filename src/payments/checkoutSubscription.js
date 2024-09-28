import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createSubscriptionCheckout(req, res) {
  const { planId } = req.body; // Plan ID comes from frontend, based on user selection

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: planId, // Price ID from your Stripe dashboard
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: 'Error creating checkout session', error });
  }
}