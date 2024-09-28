import db from '../../db';

export async function upgradeSubscription(req, res) {
  const { userId, plan } = req.body;

  try {
    await db.query('UPDATE users SET subscription_plan = $1 WHERE id = $2', [plan, userId]);
    res.status(200).json({ message: 'Subscription upgraded' });
  } catch (error) {
    res.status(500).json({ message: 'Error upgrading subscription', error });
  }
}