import { Dropbox } from 'dropbox';
import dotenv from 'dotenv';
dotenv.config();

export async function connectDropbox(req, res) {
  const dbx = new Dropbox({ clientId: process.env.DROPBOX_CLIENT_ID });
  const authUrl = dbx.getAuthenticationUrl(process.env.DROPBOX_REDIRECT_URI);
  res.redirect(authUrl);
}

// OAuth callback handler
export async function dropboxCallback(req, res) {
  const dbx = new Dropbox({ clientId: process.env.DROPBOX_CLIENT_ID, clientSecret: process.env.DROPBOX_CLIENT_SECRET });
  const { code } = req.query;

  try {
    const token = await dbx.getAccessTokenFromCode(process.env.DROPBOX_REDIRECT_URI, code);
    req.user.dropboxAccessToken = token;
    // Save token to the user's session or DB
    res.redirect('/files/dropbox');
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to Dropbox', error });
  }
}