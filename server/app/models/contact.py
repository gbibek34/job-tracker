from pydantic import BaseModel, EmailStr
from typing import Optional
import uuid

class ContactBase(BaseModel):
    application_id: uuid.UUID
    name: str
    role: Optional[str] = None
    email: Optional[EmailStr] = None
    linkedin_url: Optional[str] = None
    notes: Optional[str] = None

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    email: Optional[EmailStr] = None
    linkedin_url: Optional[str] = None
    notes: Optional[str] = None

class ContactResponse(ContactBase):
    id: uuid.UUID

    class Config:
        from_attributes = True