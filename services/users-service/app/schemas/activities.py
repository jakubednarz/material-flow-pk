import uuid
from datetime import datetime

from pydantic import BaseModel


class UserActivitySchema(BaseModel):
    user_id: uuid.UUID
    action: str
    details: str
    created_at: datetime
