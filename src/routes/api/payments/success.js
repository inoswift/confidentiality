// src/api/payments/success.js
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function get(req, res) {
  const sessionId = req.query.session_id;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

    res.json({ session, lineItems });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching session details', error });
  }
}