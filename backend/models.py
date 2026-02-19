from sqlalchemy import Column, Integer, String, Date, Text, DateTime, Enum as SQLEnum
from sqlalchemy.sql import func
from database import Base
import enum
from datetime import datetime

class StatusEnum(str, enum.Enum):
    """Status enum for follow-ups"""
    PENDING = "pending"
    COMPLETED = "completed"

class FollowUp(Base):
    """FollowUp model for database"""
    __tablename__ = "followups"
    
    id = Column(Integer, primary_key=True, index=True)
    person_name = Column(String(255), nullable=False, index=True)
    context = Column(String(255), nullable=False)
    followup_date = Column(Date, nullable=False, index=True)
    status = Column(SQLEnum(StatusEnum), default=StatusEnum.PENDING, nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    
    def to_dict(self):
        """Convert model to dictionary"""
        return {
            "id": self.id,
            "person_name": self.person_name,
            "context": self.context,
            "followup_date": self.followup_date.isoformat() if self.followup_date else None,
            "status": self.status.value,
            "notes": self.notes,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
