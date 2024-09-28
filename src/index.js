require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors'); // Handle CORS for API requests
const bodyParser = require('body-parser'); // For parsing JSON request bodies
const stripeRoutes = require('./routes/api/stripe'); // Your Stripe integration
const driveRoutes = require('./routes/api/googledrive'); // Google Drive routes
const dropboxRoutes = require('./routes/api/dropbox'); // Dropbox routes

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON body payloads

// Route handling
app.use('/api/stripe', stripeRoutes);
app.use('/api/googledrive', driveRoutes);
app.use('/api/dropbox', dropboxRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});