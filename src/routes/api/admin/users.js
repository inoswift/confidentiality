import db from '../../../db';

export async function get(req, res) {
  const users = await db.query(`
    SELECT u.email, f.file_name, p.expiration_date, 
           CASE 
             WHEN p.expiration_date < NOW() THEN 'Expired'
             ELSE 'Active' 
           END AS status
    FROM users u
    JOIN purchases p ON u.id = p.user_id
    JOIN files f ON p.file_id = f.id
  `);

  res.json(users.rows);
}