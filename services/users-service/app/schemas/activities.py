import uuid
from pydantic import BaseModel
from datetime import datetime



class UserActivitySchema(BaseModel):
    user_id: uuid.UUID
    action: str
    details: str
    created_at: datetime
    