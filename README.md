# CareerCanvas

CareerCanvas is a full-stack career management platform designed to help users organize, track, and analyze their job applications throughout the hiring process.

The platform provides a centralized workspace where users can manage job applications, resumes, application statuses, and career activity from a single dashboard.

---

## 🚀 Current Status

CareerCanvas is currently under active development.

The core application workflow is already functional, including:

- User registration and login
- JWT-based authentication
- Protected application routes
- Job application CRUD operations
- Kanban-style job tracking
- Drag-and-drop application status management
- Resume management
- Dashboard statistics
- Application status analytics
- Resume usage analytics
- Recent job applications
- User-specific data isolation
- Search and status filtering
- Job editing and deletion

The project is being developed with a production-oriented architecture so that it can eventually support multiple users and real-world usage.

---

# ✨ Features

## Authentication

- User registration
- User login
- JWT authentication
- Protected API routes
- Persistent login sessions
- Logout and authentication cleanup
- User-specific application data

## Job Application Tracking

Users can create and manage job applications with information such as:

- Job title
- Company
- Application status
- Applied date
- Job URL
- Application source
- Notes
- Resume used for the application

### Supported Application Statuses

- Applied
- Interview
- Offer
- Rejected

Applications can be moved between statuses using the Kanban board.

## Kanban Board

CareerCanvas provides a visual Kanban workflow for managing applications.

```text
┌────────────┐
│  Applied   │
└─────┬──────┘
      ↓
┌────────────┐
│ Interview  │
└─────┬──────┘
      ↓
┌────────────┐
│   Offer    │
└────────────┘

        or

┌────────────┐
│  Rejected  │
└────────────┘