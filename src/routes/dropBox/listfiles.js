import { Dropbox } from 'dropbox';
import dotenv from 'dotenv';
dotenv.config();

export async function listDropboxFiles(req, res) {
  const dbx = new Dropbox({ accessToken: req.user.dropboxAccessToken });

  try {
    const response = await dbx.filesListFolder({ path: '' });
    res.status(200).json(response.entries);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Dropbox files', error });
  }
}