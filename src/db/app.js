import express from 'express';
import { authenticateJWT } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

// Import routes
import userFiles from './routes/api/user/files';
import adminUsers from './routes/api/admin/users';
import stripeWebhook from './routes/api/stripe/webhook';
import login from './routes/auth/login';
import register from './routes/auth/register';
import logout from './routes/auth/logout';
import refreshToken from './routes/auth/refreshToken';
import logger from './utils/logger';

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

// Rate limiting for login route
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts, try again later."
});
app.use('/auth/login', loginLimiter);

// Protected routes
app.use('/api/user/files', authenticateJWT, userFiles);
app.use('/api/admin/users', authenticateJWT, adminUsers);
app.use('/api/stripe/webhook', stripeWebhook);

// Auth routes
app.use('/auth/login', login);
app.use('/auth/register', register);
app.use('/auth/logout', logout);
app.use('/auth/refreshToken', refreshToken);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Use error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);


// The Logger
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).send('Internal Server Error');
});

});