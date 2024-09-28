import db from '../../db';

export async function post(req, res) {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token required' });
  }

  // Remove the refresh token from the database
  try {
    await db.query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out' });
  }
}