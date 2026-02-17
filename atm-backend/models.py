from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class AgentTask(BaseModel):
    id: Optional[PyObjectId] = Field(None, alias="_id")
    target_agent: str # claw, bar, noma, naji
    command: str
    status: str = "pending" # pending, running, completed, failed
    schedule_type: str = "immediate" # immediate, cron, once
    cron_expression: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    started_at: Optional[datetime] = None
    finished_at: Optional[datetime] = None
    output: Optional[str] = None
    error: Optional[str] = None

    class Config:
        json_encoders = {ObjectId: str}
        populate_by_name = True

class AgentStatus(BaseModel):
    agent_id: str
    is_online: bool
    current_task_id: Optional[str] = None
    last_seen: datetime = Field(default_factory=datetime.utcnow)
