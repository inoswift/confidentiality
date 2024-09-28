import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// Generate Access Token
export function generateAccessToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,              // User role (admin, creator, user, etc.)
    isCreator: user.isCreator,    // Whether the user is a content creator
    hasFileAccess: user.hasFileAccess, // Permission to access specific files
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
}

// Generate Refresh Token
export function generateRefreshToken(user) {
  const payload = {
    id: user.id,
    isCreator: user.isCreator,
    hasFileAccess: user.hasFileAccess,  // Persisting access permissions in refresh tokens
  };
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

// Verify Access Token
export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Verify Refresh Token
export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    return null;
  }
}

// Middleware to ensure user has access to files (for Dropbox/Google Drive)
export function ensureFileAccess(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  const decodedToken = verifyAccessToken(token);

  if (!decodedToken || !decodedToken.hasFileAccess) {
    return res.status(403).json({ message: 'Access to files denied.' });
  }
  next();
}