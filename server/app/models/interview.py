from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum
import uuid

class InterviewType(str, Enum):
    phone = "phone"
    technical = "technical"
    onsite = "onsite"
    hr = "hr"
    behavioral = "behavioral"
    final = "final"

class InterviewOutcome(str, Enum):
    pending = "pending"
    passed = "passed"
    failed = "failed"
    cancelled = "cancelled"
    rescheduled = "rescheduled"

class InterviewBase(BaseModel):
    application_id: uuid.UUID
    interview_type: Optional[InterviewType] = None
    scheduled_at: Optional[datetime] = None
    notes: Optional[str] = None
    outcome: Optional[InterviewOutcome] = InterviewOutcome.pending

class InterviewCreate(InterviewBase):
    pass

class InterviewUpdate(BaseModel):
    interview_type: Optional[InterviewType] = None
    scheduled_at: Optional[datetime] = None
    notes: Optional[str] = None
    outcome: Optional[InterviewOutcome] = None

class InterviewResponse(InterviewBase):
    id: uuid.UUID

    class Config:
        from_attributes = True