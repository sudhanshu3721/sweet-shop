"""
Database seeding script for Sweet Shop
Creates an admin user and sample sweets
"""
import sys
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).parent.parent / "backend"
sys.path.insert(0, str(backend_path.parent))

from backend.database import SessionLocal, engine, Base
from backend.models import User, Sweet
from backend.auth import get_password_hash

def seed_database():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Create admin user
        admin = db.query(User).filter(User.username == "admin").first()
        if not admin:
            admin = User(
                email="admin@sweetshop.com",
                username="admin",
                hashed_password=get_password_hash("admin123"),
                is_admin=True
            )
            db.add(admin)
            print("✓ Created admin user (username: admin, password: admin123)")
        
        # Create regular user
        user = db.query(User).filter(User.username == "user").first()
        if not user:
            user = User(
                email="user@sweetshop.com",
                username="user",
                hashed_password=get_password_hash("user123"),
                is_admin=False
            )
            db.add(user)
            print("✓ Created regular user (username: user, password: user123)")
        
        # Create sample sweets
        sweets_data = [
            {
                "name": "Chocolate Truffle",
                "category": "Chocolate",
                "price": 2.99,
                "quantity": 50,
                "description": "Rich dark chocolate truffle with cocoa powder",
                "image_url": "/placeholder.svg?height=200&width=200"
            },
            {
                "name": "Strawberry Gummy",
                "category": "Gummy",
                "price": 1.49,
                "quantity": 100,
                "description": "Sweet and chewy strawberry-flavored gummy bears",
                "image_url": "/placeholder.svg?height=200&width=200"
            },
            {
                "name": "Mint Candy",
                "category": "Hard Candy",
                "price": 0.99,
                "quantity": 200,
                "description": "Refreshing peppermint hard candy",
                "image_url": "/placeholder.svg?height=200&width=200"
            },
            {
                "name": "Caramel Toffee",
                "category": "Toffee",
                "price": 3.49,
                "quantity": 30,
                "description": "Buttery caramel toffee with sea salt",
                "image_url": "/placeholder.svg?height=200&width=200"
            },
            {
                "name": "Sour Patch Kids",
                "category": "Gummy",
                "price": 2.49,
                "quantity": 75,
                "description": "Sour then sweet gummy candies",
                "image_url": "/placeholder.svg?height=200&width=200"
            },
            {
                "name": "Lollipop Assorted",
                "category": "Lollipop",
                "price": 1.99,
                "quantity": 120,
                "description": "Colorful assorted flavor lollipops",
                "image_url": "/placeholder.svg?height=200&width=200"
            },
            {
                "name": "Licorice Twist",
                "category": "Licorice",
                "price": 1.79,
                "quantity": 60,
                "description": "Classic black licorice twists",
                "image_url": "/placeholder.svg?height=200&width=200"
            },
            {
                "name": "Marshmallow Clouds",
                "category": "Marshmallow",
                "price": 2.29,
                "quantity": 45,
                "description": "Fluffy vanilla marshmallows",
                "image_url": "/placeholder.svg?height=200&width=200"
            },
        ]
        
        for sweet_data in sweets_data:
            existing = db.query(Sweet).filter(Sweet.name == sweet_data["name"]).first()
            if not existing:
                sweet = Sweet(**sweet_data)
                db.add(sweet)
        
        db.commit()
        print(f"✓ Created {len(sweets_data)} sample sweets")
        print("\n✅ Database seeded successfully!")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
