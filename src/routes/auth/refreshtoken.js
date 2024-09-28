import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../db';  // Assuming refresh tokens are stored in the DB

dotenv.config();

export async function post(req, res) {
  const { refreshToken } = req.body;

  // Check if refresh token is provided
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Check if the refresh token exists in the database (or memory storage)
    const result = await db.query('SELECT * FROM refresh_tokens WHERE token = $1', [refreshToken]);

    if (!result.rows.length) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // If valid, generate a new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id },  // Payload (user ID)
      process.env.JWT_SECRET,  // Access token secret
      { expiresIn: '15m' }  // Access token expiration time (e.g., 15 minutes)
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
}