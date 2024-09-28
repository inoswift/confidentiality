import db from '../db';

export async function cleanupExpiredTokens() {
  try {
    const result = await db.query('DELETE FROM tokens WHERE expiration_date < NOW()');
    console.log(`Deleted ${result.rowCount} expired tokens.`);
  } catch (error) {
    console.error('Error cleaning up tokens:', error);
  }
}