import db from '../db';
import { sendEmail } from '../utils/emailHelper';  // Assume you have an email helper

export async function sendExpiryReminders() {
  const subscriptions = await db.query(`
    SELECT u.email, s.expiration_date
    FROM subscriptions s
    JOIN users u ON s.user_id = u.id
    WHERE s.expiration_date < NOW() + INTERVAL '7 days'
  `);

  subscriptions.rows.forEach(async (subscription) => {
    await sendEmail(subscription.email, 'Your subscription is expiring soon', `
      Your subscription will expire on ${subscription.expiration_date}. Please renew it to maintain access.
    `);
  });
}