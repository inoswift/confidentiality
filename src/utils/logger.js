import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'error.log', level: 'error' }) // Log errors to file
  ],
});

export default logger;


// if using express routes
// import logger from './utils/logger';

// Inside your error handler middleware
//app.use((err, req, res, next) => {
 //logger.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  // res.status(500).send('Something broke!');
// });