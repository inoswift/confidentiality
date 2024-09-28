import db from '../../../db';

export async function get(req, res) {
  const { fileId } = req.params;

  try {
    const file = await db.query('SELECT * FROM files WHERE id = $1', [fileId]);

    if (!file.rows.length) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Check if the user has paid for the file (implement your payment tracking here)
    // If yes, provide the download link or display the file

    res.status(200).json({ message: 'Access granted', file: file.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error accessing file', error });
  }
}