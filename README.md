# Sweet Shop Management System

A full-stack TDD kata project demonstrating a complete e-commerce system for managing a sweet shop inventory.

## Tech Stack

**Backend:**
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication (python-jose)
- Password hashing (passlib with bcrypt)

**Frontend:**
- React (Next.js 16)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components

## Features

### Authentication
- User registration with email validation
- Secure JWT-based login
- Admin and regular user roles
- Token-based session management

### Customer Features
- Browse all available sweets
- Search and filter by name, category, and price range
- View detailed sweet information
- Purchase sweets (with stock validation)
- Real-time stock updates

### Admin Features
- Add new sweets to inventory
- Update sweet details (name, category, price, description)
- Delete sweets from inventory
- Restock sweet quantities
- View all inventory with management controls

## Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Install Python dependencies:

   cd C:\Users\Dell\Downloads
git clone https://github.com/sudhanshu3721/sweet-shop.git
cd sweet-shop

\`\`\`bash
pip install -r backend/requirements.txt
\`\`\`

3. Seed the database with sample data:
\`\`\`bash
python scripts/seed_database.py
\`\`\`

4. Start the FastAPI server:
\`\`\`bash
uvicorn backend.main:app --reload
\`\`\`

The API will be available at `http://localhost:8000`
API documentation: `http://localhost:8000/docs`

### Frontend Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The application will be available at `http://localhost:3000`

## Default Users

After seeding the database, you can log in with:

- **Admin Account**
  - Username: `admin`
  - Password: `admin123`
  - Can manage inventory, add/edit/delete sweets, and restock

- **Regular User Account**
  - Username: `user`
  - Password: `user123`
  - Can browse and purchase sweets

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Sweets (All Protected)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets with filters (query params: name, category, min_price, max_price)
- `GET /api/sweets/{id}` - Get a specific sweet
- `POST /api/sweets` - Create sweet (Admin only)
- `PUT /api/sweets/{id}` - Update sweet (Admin only)
- `DELETE /api/sweets/{id}` - Delete sweet (Admin only)
- `POST /api/sweets/{id}/purchase` - Purchase a sweet (body: {quantity: number})
- `POST /api/sweets/{id}/restock` - Restock a sweet (Admin only, body: {quantity: number})

## Testing

### Backend Tests
The backend follows TDD principles with comprehensive test coverage including:
- Unit tests for authentication logic
- Integration tests for API endpoints
- Database operation tests
- Authorization and permission tests

Run backend tests:
\`\`\`bash
pytest backend/tests/ -v
\`\`\`

## Project Structure

\`\`\`
sweet-shop/
├── backend/
│   ├── main.py              # FastAPI application entry
│   ├── database.py          # Database configuration
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── auth.py              # Authentication utilities
│   ├── routers/
│   │   ├── auth.py          # Auth endpoints
│   │   └── sweets.py        # Sweets endpoints
│   └── requirements.txt     # Python dependencies
├── scripts/
│   └── seed_database.py     # Database seeding script
├── app/
│   ├── page.tsx             # Login/Register page
│   ├── dashboard/
│   │   └── page.tsx         # Main dashboard
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
└── components/
    ├── login-form.tsx       # Login form component
    ├── register-form.tsx    # Register form component
    ├── sweet-grid.tsx       # Sweet cards grid
    ├── sweet-card.tsx       # Individual sweet card
    ├── search-filters.tsx   # Search and filter UI
    └── admin-panel.tsx      # Admin management panel
\`\`\`

## Troubleshooting

### Backend won't start
- Make sure Python dependencies are installed: `pip install -r backend/requirements.txt`
- Check that no other service is using port 8000
- Verify database was seeded: `python scripts/seed_database.py`

### Frontend won't start
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check that no other service is using port 3000
- Ensure backend is running first

### Login fails
- Verify backend is running at `http://localhost:8000`
- Check browser console for CORS errors
- Ensure database was seeded with default users

### Search/Filter not working
- Ensure you're logged in (token exists in localStorage)
- Check backend logs for any errors
- Verify the search endpoint is working: `http://localhost:8000/docs`

## My AI Usage

### Tools Used
- GitHub Copilot
- ChatGPT
- v0 by Vercel

### How AI Was Used

1. **Boilerplate Generation**: Used AI to generate initial FastAPI route structure and SQLAlchemy models, saving significant setup time.

2. **Test Creation**: AI helped generate comprehensive unit test templates for authentication and API endpoints, which I then customized for specific edge cases.

3. **Frontend Components**: Leveraged AI to create React component structures following best practices, then manually refined styling and business logic.

4. **Documentation**: AI assisted in generating clear API documentation and setup instructions in the README.

5. **Debugging**: When encountering CORS issues, used AI to quickly identify the problem and implement the correct middleware configuration.

6. **Code Review**: AI helped identify potential security issues in the authentication flow, leading to improved password hashing implementation.

### Reflection

AI tools significantly accelerated development, particularly for repetitive tasks like model definitions and test scaffolding. However, the most valuable aspect was having AI as a "pair programmer" to discuss architectural decisions and catch potential issues early. I found that AI works best when given specific, focused tasks rather than asking it to generate entire features. The combination of AI-assisted development with manual refinement and testing produced higher quality code faster than either approach alone.

## License

MIT License

# Screenshots
<img width="1920" height="1080" alt="Screenshot (248)" src="https://github.com/user-attachments/assets/7414aaa4-1cc6-4a17-8798-6bc010e210b0" />


