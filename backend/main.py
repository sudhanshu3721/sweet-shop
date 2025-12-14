from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database import engine, Base
from backend.routers import auth, sweets

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sweet Shop API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(sweets.router, prefix="/api/sweets", tags=["sweets"])

@app.get("/")
def read_root():
    return {"message": "Sweet Shop API"}
