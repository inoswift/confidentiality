import db from '../../../db';

export async function post(req, res) {
  const { userId, fileId } = req.body;

  try {
    await db.query(`
      UPDATE purchases
      SET expiration_date = expiration_date + INTERVAL '1 month'
      WHERE user_id = $1 AND file_id = $2
    `, [userId, fileId]);

    res.status(200).send('Subscription renewed');
  } catch (err) {
    res.status(500).send('Error renewing subscription');
  }
}