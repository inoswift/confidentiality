import db from '../../../db';

export async function post(req, res) {
  const { userId, newRole } = req.body;

  try {
    await db.query('UPDATE users SET role = $1 WHERE id = $2', [newRole, userId]);
    res.json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
}