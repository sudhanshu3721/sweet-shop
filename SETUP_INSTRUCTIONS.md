# Sweet Shop Management System - Setup Instructions

## Prerequisites

- Python 3.8+ installed
- Node.js 18+ installed
- Terminal/Command Prompt

## Step-by-Step Setup

### 1. Backend Setup

Open a terminal and navigate to your project directory:

\`\`\`bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Seed the database with sample data
python scripts/seed_database.py
\`\`\`

You should see output like:
\`\`\`
Database seeded successfully!
Created users:
- Admin: username=admin, password=admin123
- Regular user: username=user, password=user123
Created 10 sample sweets
\`\`\`

### 2. Start the Backend Server

\`\`\`bash
# Start FastAPI server
uvicorn backend.main:app --reload
\`\`\`

You should see:
\`\`\`
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
\`\`\`

**Keep this terminal window open!** The backend must be running for the frontend to work.

### 3. Start the Frontend (New Terminal Window)

Open a **new** terminal window and run:

\`\`\`bash
# Install dependencies
npm install

# Start the development server
npm run dev
\`\`\`

You should see:
\`\`\`
▲ Next.js 15.x.x
- Local:        http://localhost:3000
\`\`\`

### 4. Access the Application

Open your browser and go to: **http://localhost:3000**

### 5. Test the Application

**Login with Demo Accounts:**

- **Admin Account:**
  - Username: `admin`
  - Password: `admin123`
  - Can add, edit, delete, and restock sweets

- **Regular User Account:**
  - Username: `user`
  - Password: `user123`
  - Can browse and purchase sweets

**Or Register a New Account:**
- Click "Register" tab
- Fill in email, username, and password
- Click "Register" button

## Troubleshooting

### "Failed to fetch" Error

This means the frontend cannot connect to the backend. Make sure:

1. Backend is running on http://localhost:8000
2. You ran the seed script: `python scripts/seed_database.py`
3. No other application is using port 8000

Test the backend directly:
\`\`\`bash
curl http://localhost:8000
\`\`\`

Should return: `{"message":"Sweet Shop API"}`

### Port Already in Use

If port 8000 or 3000 is already in use:

**Backend (port 8000):**
\`\`\`bash
uvicorn backend.main:app --reload --port 8001
\`\`\`

Then update `lib/api-config.ts` to use `http://localhost:8001`

**Frontend (port 3000):**
\`\`\`bash
npm run dev -- --port 3001
\`\`\`

### Database Issues

If you encounter database errors:

\`\`\`bash
# Delete the database and recreate it
rm sweets.db
python scripts/seed_database.py
\`\`\`

## Features to Test

1. **Registration** - Create a new user account
2. **Login** - Login with admin or user credentials
3. **Browse Sweets** - View all available sweets
4. **Search** - Search sweets by name
5. **Filter** - Filter by category and price range
6. **Purchase** (Regular Users) - Buy sweets (reduces stock)
7. **Add Sweet** (Admin Only) - Add new products
8. **Edit Sweet** (Admin Only) - Update product details
9. **Delete Sweet** (Admin Only) - Remove products
10. **Restock** (Admin Only) - Increase stock levels

## Project Structure

\`\`\`
├── backend/                 # FastAPI backend
│   ├── main.py             # Main application
│   ├── models.py           # Database models
│   ├── schemas.py          # Pydantic schemas
│   ├── auth.py             # Authentication utilities
│   └── routers/            # API routes
├── app/                     # Next.js frontend
│   ├── page.tsx            # Login/Register page
│   └── dashboard/          # Main application
├── components/              # React components
├── lib/                     # Utilities
└── scripts/                 # Database scripts
\`\`\`

## Need Help?

Check the browser console (F12) for detailed error messages. The application logs all API requests with `[v0]` prefix.
