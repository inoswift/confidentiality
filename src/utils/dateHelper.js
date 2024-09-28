import { format, addDays, isBefore, parseISO } from 'date-fns';
import { utcToZonedTime, format as formatTZ } from 'date-fns-tz';

/**
 * Formats the given date into a log-friendly format.
 * Example output: "2024-09-27 10:00:00 UTC+00:00"
 * 
 * @param {Date} [date=new Date()] - The date to format. Defaults to the current date.
 * @returns {string} - Formatted date string for logs.
 */
export function formatDateForLogs(date = new Date()) {
  return format(date, "yyyy-MM-dd HH:mm:ss 'UTC'XXX");
}

/**
 * Checks if a subscription is expiring soon within a given threshold.
 * This function can be used to notify users when their subscription is about to expire.
 * 
 * @param {string} expirationDate - The ISO string of the subscription expiration date.
 * @param {number} [daysThreshold=7] - The number of days before expiration to check. Defaults to 7 days.
 * @returns {boolean} - True if the subscription is expiring within the threshold.
 */
export function isSubscriptionExpiring(expirationDate, daysThreshold = 7) {
  const now = new Date();
  const targetDate = addDays(now, daysThreshold);
  return isBefore(parseISO(expirationDate), targetDate);
}

/**
 * Converts a date to a specific time zone.
 * This is useful for displaying times in the user's local time zone or any other required zone.
 * 
 * @param {Date} [date=new Date()] - The date to convert. Defaults to the current date.
 * @param {string} [timeZone='UTC'] - The target time zone (e.g., 'America/New_York').
 * @returns {string} - The formatted date in the target time zone.
 */
export function convertToTimeZone(date = new Date(), timeZone = 'UTC') {
  const zonedTime = utcToZonedTime(date, timeZone);
  return formatTZ(zonedTime, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });
}

/**
 * Gets the current date and time in a specific time zone.
 * This function helps to show the current time based on a given time zone.
 * 
 * @param {string} [timeZone='UTC'] - The target time zone (e.g., 'America/New_York').
 * @returns {string} - The current date/time in the specified time zone.
 */
export function getCurrentDateInTimeZone(timeZone = 'UTC') {
  return convertToTimeZone(new Date(), timeZone);
}

/**
 * Example function: Get the current date/time in Eastern Time (ET).
 * Use this as a template for other time zones.
 * 
 * @returns {string} - The current date/time in Eastern Time (ET).
 */
export function getCurrentDateInEasternTime() {
  return getCurrentDateInTimeZone('America/New_York');
}

/**
 * Calculates how many days remain until the subscription expires.
 * This is helpful for calculating the remaining days in a user's subscription.
 * 
 * @param {string} expirationDate - The ISO string of the expiration date.
 * @returns {number} - The number of days remaining until expiration.
 */
export function daysUntilExpiration(expirationDate) {
  const now = new Date();
  const expiry = parseISO(expirationDate);
  const diffInTime = expiry - now;
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));  // Convert milliseconds to days
  return diffInDays;
}

/**
 * Formats a date for user-friendly display on the frontend.
 * Example output: "September 27th, 2024 10:00 AM"
 * 
 * @param {Date} [date=new Date()] - The date to format. Defaults to the current date.
 * @returns {string} - Formatted date string for display.
 */
export function formatDisplayDate(date = new Date()) {
  return format(date, 'MMMM do, yyyy h:mm a');
}