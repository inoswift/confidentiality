
# FolderPal

FolderPal is a web-based file management system that enables users to purchase access to files, manage their subscriptions, and track their purchases. It integrates secure user authentication via JWTs, Stripe for payment processing, and role-based access for administrators.

---

## Features

- **User Authentication**: Secure login and registration system with JWT-based token authentication.
- **Subscription Management**: Users can purchase, renew, and track file access subscriptions.
- **Stripe Integration**: Integrated with Stripe for handling payments and subscriptions.
- **Admin Dashboard**: Manage users, file access, and subscriptions.
- **Role-Based Access Control**: Restrict certain actions and routes to admin users only.
- **Secure Token Storage**: JWT tokens are stored in `HttpOnly` cookies to prevent XSS attacks.
- **Rate Limiting**: Protect sensitive endpoints from brute-force attacks.
- **Error Handling**: Centralized error handling for better debugging and user feedback.
- **Environment Variables**: Configuration through `.env` file for database, JWT, Stripe, and email services.

---

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Frontend**: Svelte (or React if applicable)
- **Database**: PostgreSQL
- **Payments**: Stripe API for handling transactions and subscription renewals
- **Authentication**: JSON Web Tokens (JWT) for access and refresh tokens
- **Security**: bcrypt for password hashing, JWT for token-based authentication, and rate limiting

---

## **Project Setup**

### **Requirements**

- **Node.js** (v14+)
- **PostgreSQL** (v10+)
- **Stripe Account** (for payment integration)

### **Installation**

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/folderpal.git
    cd folderpal
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create and configure a `.env` file with the following content:

    ```plaintext
    JWT_SECRET=your_jwt_secret
    JWT_REFRESH_SECRET=your_jwt_refresh_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
    DB_USER=your_db_username
    DB_PASSWORD=your_db_password
    DB_HOST=your_db_host
    DB_NAME=your_db_name
    DB_PORT=5432
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-email-password
    CLIENT_URL=http://localhost:3000
    ```

4. Run the database migrations (if applicable):
    ```bash
    npm run migrate
    ```

5. Start the application:
    ```bash
    npm start
    ```

---

## **Usage**

### **Authentication & Authorization**

- **Login**: JWT-based authentication using access and refresh tokens. Tokens are stored in cookies with `HttpOnly` and `Secure` flags.
- **Role-Based Access**: Admin users can access special endpoints for managing files and users.

### **Subscription Management**

- Users can purchase and renew file access subscriptions through the Stripe integration.
- Admins can manage user subscriptions and revoke access as needed.

### **Admin Dashboard**

- Accessible by admin users for managing users, roles, and subscriptions.

---

## **API Endpoints**

### **Authentication**
- `POST /api/auth/login`: User login with JWT.
- `POST /api/auth/register`: User registration.
- `POST /api/auth/refresh`: Refresh JWT token.

### **File Management**
- `GET /api/user/files`: List files that the user has access to.
- `POST /api/admin/renew`: Renew a user's subscription.
- `POST /api/admin/revoke`: Revoke a user's access to a file.

### **Stripe Webhooks**
- `POST /api/stripe/webhook`: Handles Stripe events like `checkout.session.completed`, `invoice.payment_failed`, etc.

---

## **Testing**

- You can run tests using:
    ```bash
    npm test
    ```

Tests are implemented for authentication, subscription management, and error handling.

---

## **Deployment**

- Use **Heroku** or **AWS** for deploying the backend.
- **Netlify** or **Vercel** for deploying the frontend (Svelte or React).
- Make sure to set the necessary environment variables on your deployment platform.

---

## **Contributing**

Feel free to submit pull requests or open issues for any bugs or new features.

---

## **License**

This project is licensed under the GNU License and Patent-Pending

---

## **Contact**

For support or inquiries, please contact [alexander@inoswift.com](mailto:alexander@inoswift.com).

---