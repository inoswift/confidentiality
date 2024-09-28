import cron from 'node-cron';
import { sendExpiryReminders } from './expiryReminders';
import { cleanupExpiredTokens } from './cleanup';

// Run daily at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily subscription reminder job...');
  await sendExpiryReminders();
});

// Run daily at midnight to clean up expired tokens
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily cleanup job...');
  await cleanupExpiredTokens();
});