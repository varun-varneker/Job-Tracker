# Job Tracker Backend

A Node.js backend application for tracking job applications built with Express, Prisma, and Supabase.

## Features

- REST API built with Express.js
- PostgreSQL database hosted on Supabase
- Prisma ORM for database management
- User authentication
- Job application tracking with status management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: JWT
- **File Upload**: Multer

## Database Schema

### User Model
- id (UUID)
- name
- email (unique)
- password (hashed)
- jobs (relation)
- createdAt

### Job Model
- id (UUID)
- title
- company
- status (APPLIED | INTERVIEW | OFFER | REJECTED)
- appliedDate
- resumeUrl
- userId (relation to User)
- createdAt

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/varun-varneker/Job-Tracker.git
cd Job-Tracker
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

4. Generate Prisma Client
```bash
npx prisma generate
```

5. Push database schema to Supabase
```bash
npx prisma db push
```

6. Start the development server
```bash
npm run dev
```

## API Endpoints

- `GET /` - Health check
- `GET /api/test-db` - Test database connection

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npx prisma studio` - Open Prisma Studio to manage database

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string from Supabase
- `JWT_SECRET` - Secret key for JWT token generation
- `PORT` - Server port (default: 5000)

## License

MIT
