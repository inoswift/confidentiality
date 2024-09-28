import db from '../../db';

export async function get(req, res) {
  try {
    const totalRevenueResult = await db.query('SELECT SUM(amount) AS totalRevenue FROM transactions');
    const totalTipsResult = await db.query('SELECT SUM(amount) AS totalTips FROM transactions WHERE type = $1', ['tip']);
    const totalSubscriptionsResult = await db.query('SELECT SUM(amount) AS totalSubscriptions FROM transactions WHERE type = $1', ['subscription']);

    const totalRevenue = totalRevenueResult.rows[0].totalrevenue || 0;
    const totalTips = totalTipsResult.rows[0].totaltips || 0;
    const totalSubscriptions = totalSubscriptionsResult.rows[0].totalsubscriptions || 0;

    res.json({
      totalRevenue,
      totalTips,
      totalSubscriptions
    });
  } catch (error) {
    console.error('Error fetching financial overview:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}