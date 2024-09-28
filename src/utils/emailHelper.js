import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Email
export function sendEmail(to, subject, text, html = null) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
}

// File Upload Confirmation Email
export function sendFileUploadConfirmation(to, fileName) {
  const subject = 'File Upload Successful';
  const text = `Your file "${fileName}" has been successfully uploaded to Dropbox/Google Drive.`;
  const html = `<p>Your file <strong>${fileName}</strong> has been successfully uploaded to Dropbox/Google Drive.</p>`;
  
  return sendEmail(to, subject, text, html);
}

// Payment Confirmation Email
export function sendPaymentConfirmation(to, amount, subscriptionType) {
  const subject = 'Payment Confirmation';
  const text = `Your payment of $${amount} for ${subscriptionType} has been successfully processed.`;
  const html = `<p>Your payment of <strong>$${amount}</strong> for <strong>${subscriptionType}</strong> has been successfully processed.</p>`;
  
  return sendEmail(to, subject, text, html);
}