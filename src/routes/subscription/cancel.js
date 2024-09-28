import db from '../../db';

export async function cancelSubscription(req, res) {
  const { userId } = req.body;

  try {
    await db.query('UPDATE subscriptions SET status = \'Cancelled\' WHERE user_id = $1', [userId]);
    res.status(200).json({ message: 'Subscription cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling subscription', error });
  }
}