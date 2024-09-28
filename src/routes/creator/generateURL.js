import Stripe from 'stripe';
import db from '../../../db';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function get(req, res) {
  const { fileId } = req.params;
  const creatorId = req.user.id;

  try {
    const file = await db.query('SELECT * FROM files WHERE id = $1 AND creator_id = $2', [fileId, creatorId]);

    if (!file.rows.length) {
      return res.status(404).json({ message: 'File not found' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        name: file.rows[0].name,
        amount: file.rows[0].price * 100, // Convert to cents
        currency: 'usd',
        quantity: 1,
      }],
      success_url: `${process.env.CLIENT_URL}/access/${fileId}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    const shareableUrl = `${process.env.CLIENT_URL}/checkout/${session.id}`;
    res.status(200).json({ url: shareableUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error generating shareable URL', error });
  }
}