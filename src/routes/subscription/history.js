import db from '../../db';

export async function viewSubscriptionHistory(req, res) {
  const { userId } = req.user;

  try {
    const subscriptions = await db.query('SELECT * FROM subscriptions WHERE user_id = $1', [userId]);
    res.status(200).json(subscriptions.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving subscription history', error });
  }
}