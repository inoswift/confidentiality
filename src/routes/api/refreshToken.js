import jwt from 'jsonwebtoken';
import db from '../../db';
import dotenv from 'dotenv';
dotenv.config();

export async function post(req, res) {
  const { refreshToken } = req.body;

  // Check if refresh token is provided
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    // Verify the refresh token using the refresh secret key
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Check if the refresh token exists in the database
    const result = await db.query('SELECT * FROM refresh_tokens WHERE token = $1', [refreshToken]);
    
    if (!result.rows.length) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Check if the refresh token has expired
    const now = Date.now() / 1000; // Get current time in seconds
    if (decoded.exp < now) {
      // Remove the expired token from the database
      await db.query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]);
      return res.status(403).json({ message: 'Refresh token expired' });
    }

    // Generate a new access token (valid for 15 minutes)
    const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Generate a new refresh token (valid for 7 days)
    const newRefreshToken = jwt.sign({ id: decoded.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    // Invalidate the old refresh token (remove it from the database)
    await db.query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]);

    // Store the new refresh token in the database
    await db.query('INSERT INTO refresh_tokens (token) VALUES ($1)', [newRefreshToken]);

    // Send back the new tokens (access and refresh)
    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });

  } catch (err) {
    console.error('Error processing refresh token:', err.message);
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
}