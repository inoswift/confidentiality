import db from '../../../db';

export async function post(req, res) {
  const { fileId, priceType, price } = req.body;

  try {
    await db.query(
      `UPDATE files SET price_type = $1, price = $2 WHERE id = $3`,
      [priceType, price, fileId]
    );

    res.status(200).json({ message: 'File pricing assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning pricing', error });
  }
}