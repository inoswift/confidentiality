// src/api/payments/fail.js
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function get(req, res) {
  const sessionId = req.query.session_id;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json({ errorMessage: 'Payment failed. Please try again.', session });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching failed session details', error });
  }
}