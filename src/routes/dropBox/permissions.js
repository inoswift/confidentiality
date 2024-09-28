import fetch from 'node-fetch';

// Function to create a shared Dropbox link for the purchased file
export async function createDropboxSharedLink(path, accessToken) {
  try {
    const response = await fetch('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path }),
    });
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error creating Dropbox shared link:', error);
  }
}