// src/utils/dateHelper.js

/**
 * Check if a subscription is expiring soon (within the next 7 days)
 * @param {string|Date} expirationDate - The expiration date of the subscription
 * @returns {boolean} - True if the subscription is expiring soon, otherwise false
 */
export function isExpiringSoon(expirationDate) {
  const expiration = new Date(expirationDate);  // Convert the date if it's a string
  const now = new Date();  // Get the current date

  const diffTime = expiration.getTime() - now.getTime();  // Difference in milliseconds
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));  // Convert to days

  return diffDays <= 7;  // Return true if it's within the next 7 days
}

/**
 * Format a date to a readable string (e.g., "MM/DD/YYYY")
 * @param {Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US');  // Format to 'MM/DD/YYYY'
}