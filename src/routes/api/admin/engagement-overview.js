import db from '../../db';

export async function get(req, res) {
  try {
    const totalClicksResult = await db.query('SELECT SUM(clicks) AS totalClicks FROM content_stats');
    const topContentResult = await db.query('SELECT name FROM content WHERE id = (SELECT content_id FROM content_stats ORDER BY clicks DESC LIMIT 1)');

    const totalClicks = totalClicksResult.rows[0].totalclicks || 0;
    const topContent = topContentResult.rows[0].name || 'No content';

    res.json({
      totalClicks,
      topContent
    });
  } catch (error) {
    console.error('Error fetching engagement overview:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}