from pydantic import BaseModel, EmailStr, Field
from typing import Optional

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)

class UserResponse(UserBase):
    id: int
    is_admin: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class TokenData(BaseModel):
    username: Optional[str] = None

# Sweet schemas
class SweetBase(BaseModel):
    name: str
    category: str
    price: float = Field(..., gt=0)
    quantity: int = Field(..., ge=0)
    description: Optional[str] = None
    image_url: Optional[str] = None

class SweetCreate(SweetBase):
    pass

class SweetUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    quantity: Optional[int] = Field(None, ge=0)
    description: Optional[str] = None
    image_url: Optional[str] = None

class SweetResponse(SweetBase):
    id: int

    class Config:
        from_attributes = True

class PurchaseRequest(BaseModel):
    quantity: int = Field(..., gt=0)

class RestockRequest(BaseModel):
    quantity: int = Field(..., gt=0)
