import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createOneTimeCheckout(req, res) {
  const { fileId, price } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        name: 'One-Time Access to File',
        amount: price * 100, // Price in cents
        currency: 'usd',
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
      metadata: { fileId }, // Include fileId in metadata to track which file is being purchased
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: 'Error creating checkout session', error });
  }
}