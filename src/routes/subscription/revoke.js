import db from '../../db';

export async function revokeSubscription(req, res) {
  const { userId, fileId } = req.body;

  try {
    await db.query(
      `UPDATE purchases SET status = 'Revoked'
       WHERE user_id = $1 AND file_id = $2`, 
      [userId, fileId]
    );
    res.status(200).json({ message: 'Subscription revoked' });
  } catch (error) {
    res.status(500).json({ message: 'Error revoking subscription', error });
  }
}