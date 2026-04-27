from pydantic import BaseModel
from typing import Optional
from datetime import date
from enum import Enum
import uuid

class ApplicationStatus(str, Enum):
    applied = "applied"
    interviewing = "interviewing"
    offered = "offered"
    rejected = "rejected"
    withdrawn = "withdrawn"

class ApplicationCreate(BaseModel):
    user_id: uuid.UUID
    company_name: str
    job_title: str
    job_url: Optional[str] = None
    status: ApplicationStatus = ApplicationStatus.applied
    applied_date: Optional[date] = None
    notes: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    location: Optional[str] = None

class ApplicationUpdate(BaseModel):
    company_name: Optional[str] = None
    job_title: Optional[str] = None
    status: Optional[ApplicationStatus] = None
    notes: Optional[str] = None

class ApplicationResponse(ApplicationCreate):
    id: uuid.UUID
    created_at: str
    updated_at: str