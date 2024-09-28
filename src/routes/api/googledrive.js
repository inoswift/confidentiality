import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function getGoogleDriveFiles(req, res) {
  const { tokens } = await oauth2Client.getToken(req.query.code);
  oauth2Client.setCredentials(tokens);
  
  const drive = google.drive({ version: 'v3', auth: oauth2Client });
  const files = await drive.files.list({ pageSize: 10 });
  
  res.json(files.data.files);
}