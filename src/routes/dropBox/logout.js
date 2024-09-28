export async function dropboxLogout(req, res) {
  req.user.dropboxAccessToken = null; // Clear the user's Dropbox access token
  res.redirect('/dashboard'); // Redirect user to the dashboard or login page
}