from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import Sweet, User
from backend.schemas import (
    SweetCreate,
    SweetUpdate,
    SweetResponse,
    PurchaseRequest,
    RestockRequest
)
from backend.auth import get_current_user, get_current_admin

router = APIRouter()

@router.post("", response_model=SweetResponse, status_code=status.HTTP_201_CREATED)
def create_sweet(
    sweet: SweetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    db_sweet = Sweet(**sweet.dict())
    db.add(db_sweet)
    db.commit()
    db.refresh(db_sweet)
    return db_sweet

@router.get("", response_model=List[SweetResponse])
def get_sweets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    sweets = db.query(Sweet).all()
    return sweets

@router.get("/search", response_model=List[SweetResponse])
def search_sweets(
    name: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Sweet)
    
    if name:
        query = query.filter(Sweet.name.ilike(f"%{name}%"))
    if category:
        query = query.filter(Sweet.category.ilike(f"%{category}%"))
    if min_price is not None:
        query = query.filter(Sweet.price >= min_price)
    if max_price is not None:
        query = query.filter(Sweet.price <= max_price)
    
    sweets = query.all()
    return sweets

@router.get("/{sweet_id}", response_model=SweetResponse)
def get_sweet(
    sweet_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sweet not found"
        )
    return sweet

@router.put("/{sweet_id}", response_model=SweetResponse)
def update_sweet(
    sweet_id: int,
    sweet_update: SweetUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sweet not found"
        )
    
    update_data = sweet_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(sweet, key, value)
    
    db.commit()
    db.refresh(sweet)
    return sweet

@router.delete("/{sweet_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_sweet(
    sweet_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sweet not found"
        )
    
    db.delete(sweet)
    db.commit()
    return None

@router.post("/{sweet_id}/purchase", response_model=SweetResponse)
def purchase_sweet(
    sweet_id: int,
    purchase: PurchaseRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sweet not found"
        )
    
    if sweet.quantity < purchase.quantity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Not enough stock. Available: {sweet.quantity}"
        )
    
    sweet.quantity -= purchase.quantity
    db.commit()
    db.refresh(sweet)
    return sweet

@router.post("/{sweet_id}/restock", response_model=SweetResponse)
def restock_sweet(
    sweet_id: int,
    restock: RestockRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sweet not found"
        )
    
    sweet.quantity += restock.quantity
    db.commit()
    db.refresh(sweet)
    return sweet
