# Sweet Shop Backend API

FastAPI backend for the Sweet Shop Management System.

## Setup

1. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

2. Run the seeding script to create sample data:
\`\`\`bash
python scripts/seed_database.py
\`\`\`

3. Start the server:
\`\`\`bash
uvicorn backend.main:app --reload
\`\`\`

The API will be available at `http://localhost:8000`

## Default Users

- **Admin**: username: `admin`, password: `admin123`
- **User**: username: `user`, password: `user123`

## API Documentation

Visit `http://localhost:8000/docs` for interactive API documentation.

## Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login

### Sweets (Protected)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets
- `POST /api/sweets` - Create sweet (Admin only)
- `PUT /api/sweets/{id}` - Update sweet (Admin only)
- `DELETE /api/sweets/{id}` - Delete sweet (Admin only)
- `POST /api/sweets/{id}/purchase` - Purchase sweet
- `POST /api/sweets/{id}/restock` - Restock sweet (Admin only)
