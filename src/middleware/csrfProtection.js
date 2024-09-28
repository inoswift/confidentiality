import csurf from 'csurf';

// Initialize CSRF protection middleware
export const csrfProtection = csurf({
  cookie: true // Set to true if using cookies to store the CSRF token
});

// Example usage in an Express app
export default function applyCsrfProtection(app) {
  app.use(csrfProtection); // Apply CSRF protection globally

  // Route to get the CSRF token for forms
  app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() }); // Send CSRF token for forms
  });
}