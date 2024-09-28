export async function post(req, res) {
  // If you're using refresh tokens stored in DB or Redis, invalidate them here.

  res.status(200).json({ message: 'Logged out successfully' });
}