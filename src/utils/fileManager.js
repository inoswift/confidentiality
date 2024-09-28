import { google } from 'googleapis';
import fetch from 'node-fetch';
import logger from './logger';
import dotenv from 'dotenv';
dotenv.config();

// Upload file to Dropbox
export async function uploadToDropbox(accessToken, filePath, content) {
  try {
    const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify({ path: filePath }),
        'Content-Type': 'application/octet-stream',
      },
      body: content,
    });
    const result = await response.json();
    logger.info(`File uploaded to Dropbox: ${filePath}`);
    return result;
  } catch (error) {
    logger.error(`Error uploading file to Dropbox: ${error.message}`);
    throw error;
  }
}

// Download file from Dropbox
export async function downloadFromDropbox(accessToken, filePath) {
  try {
    const response = await fetch('https://content.dropboxapi.com/2/files/download', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify({ path: filePath }),
      },
    });
    const content = await response.text();
    logger.info(`File downloaded from Dropbox: ${filePath}`);
    return content;
  } catch (error) {
    logger.error(`Error downloading file from Dropbox: ${error.message}`);
    throw error;
  }
}

// Upload file to Google Drive
export async function uploadToGoogleDrive(auth, fileName, fileContent) {
  const drive = google.drive({ version: 'v3', auth });
  const fileMetadata = { name: fileName };
  const media = { mimeType: 'application/octet-stream', body: fileContent };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id',
    });
    logger.info(`File uploaded to Google Drive: ${fileName}`);
    return response.data;
  } catch (error) {
    logger.error(`Error uploading file to Google Drive: ${error.message}`);
    throw error;
  }
}

// Manage OAuth tokens for Dropbox and Google Drive
export async function refreshDropboxToken(userId) {
  // Logic to refresh Dropbox token using stored refresh token
}

export async function refreshGoogleDriveToken(userId) {
  // Logic to refresh Google Drive token using stored refresh token
}