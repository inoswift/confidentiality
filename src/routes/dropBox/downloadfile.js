import { Dropbox } from 'dropbox';
import dotenv from 'dotenv';
dotenv.config();

export async function downloadDropboxFile(req, res) {
  const { fileId } = req.params;
  const dbx = new Dropbox({ accessToken: req.user.dropboxAccessToken });

  try {
    const file = await dbx.filesDownload({ path: fileId });
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: 'Error downloading file from Dropbox', error });
  }
}