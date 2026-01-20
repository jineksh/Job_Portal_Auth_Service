# Job Portal Auth Service

## Description

A Node.js backend service for handling authentication, user management, skills, and job applications in a job portal system. It provides RESTful APIs for user registration, login, profile management, and more.

## Features

- User authentication (register, login, forgot/reset password)
- JWT-based authorization
- User profile management (update profile, upload resume, profile picture)
- Skills management (add skills to user profile)
- Job application functionality
- Email notifications (using Nodemailer and BullMQ for background processing)
- File uploads (using Multer)
- Redis caching
- MySQL database with Sequelize ORM
- CORS support
- Error handling middleware

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL with Sequelize ORM
- **Authentication:** JWT (jsonwebtoken)
- **Caching:** Redis
- **Queue:** BullMQ
- **Email:** Nodemailer
- **File Upload:** Multer
- **Password Hashing:** bcrypt
- **Other:** Axios, CORS, dotenv, http-status-codes

## Prerequisites

- Node.js (v14 or higher)
- MySQL
- Redis
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd job-portal-auth-service
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables (see Environment Variables section).

4. Set up the database (see Database Setup section).

5. Run migrations:
   ```
   npx sequelize-cli db:migrate
   ```

6. Run seeders (if any):
   ```
   npx sequelize-cli db:seed:all
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=job_portal_auth
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Database Setup

1. Create a MySQL database named `job_portal_auth`.

2. Update the database configuration in `src/config/config.json` or use environment variables.

3. Run migrations to create tables:
   ```
   npx sequelize-cli db:migrate
   ```

## Running the Application

1. Start the server:
   ```
   npm start
   ```

2. The server will run on `http://localhost:5000`.

3. Test the service:
   - GET `http://localhost:5000/home` - Check if service is running.

## Folder Structure

```
job-portal-auth-service/
├── .gitignore
├── package.json
├── package-lock.json
├── src/
│   ├── index.js
│   ├── api/
│   │   ├── applicationApi.js
│   │   └── uploadApi.js
│   ├── config/
│   │   ├── mail.js
│   │   ├── redis.js
│   │   └── server.js
│   ├── controller/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── errors/
│   │   └── index.js
│   ├── middleware/
│   │   ├── authenticate.js
│   │   ├── errorHandler.js
│   │   └── multer.js
│   ├── migrations/
│   │   ├── 20251223095927-create-role.js
│   │   ├── 20251223101723-create-user.js
│   │   ├── 20251223102502-create-skill.js
│   │   └── 20251223102919-create-user-skill.js
│   ├── models/
│   │   ├── index.js
│   │   ├── role.js
│   │   ├── skill.js
│   │   ├── user.js
│   │   └── userskill.js
│   ├── producers/
│   │   └── email.js
│   ├── queue/
│   │   └── email.js
│   ├── Repository/
│   │   ├── skillRepository.js
│   │   ├── userRepsitory.js
│   │   └── userRole.js
│   ├── routes/
│   │   ├── index.js
│   │   └── v1/
│   │       ├── index.js
│   │       ├── AuthRoute/
│   │       │   └── index.js
│   │       ├── TestRoute/
│   │       │   └── index.js
│   │       └── UserRoute/
│   │           └── index.js
│   ├── seeders/
│   │   └── user_role.js
│   ├── Service/
│   │   ├── authService.js
│   │   └── userService.js
│   ├── utils/
│   │   ├── apiResponse.js
│   │   ├── dataUri.js
│   │   ├── emailTemplate.js
│   │   ├── generateToken.js
│   │   └── sendMail.js
│   └── worker/
│       └── email.js
└── README.md
```

## API Endpoints

### Authentication Routes (`/api/v1/auth`)

- **POST /api/v1/auth/register** - Register a new user
- **POST /api/v1/auth/login** - Login user
- **PUT /api/v1/auth/forgot-password** - Send forgot password email
- **PUT /api/v1/auth/reset-password/:token** - Reset password with token

### User Routes (`/api/v1/user`)

- **GET /api/v1/user/my-profile** - Get current user profile (authenticated)
- **GET /api/v1/user/:id** - Get user by ID
- **POST /api/v1/user/add-skills** - Add skills to user (authenticated)
- **PATCH /api/v1/user/profile** - Update user profile (authenticated)
- **PATCH /api/v1/user/update-resume** - Update resume (authenticated, file upload)
- **POST /api/v1/user/add-profilePic** - Add profile picture (authenticated, file upload)
- **PATCH /api/v1/user/profile-picture** - Update profile picture (authenticated, file upload)
- **POST /api/v1/user/apply/:jobid** - Apply for a job (authenticated)
- **GET /api/v1/user/me/applications** - Get user's applications (authenticated)

### Test Routes (`/api/v1/test`)

- **GET /api/v1/test/** - Test route (authenticated)

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

## License

ISC
