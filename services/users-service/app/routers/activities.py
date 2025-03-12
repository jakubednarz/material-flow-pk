import uuid

from fastapi import APIRouter

from ..api import activities
from ..database import SessionDep
from ..schemas.activities import UserActivitySchema

router = APIRouter(tags=["User Activity"])


@router.post("/user-activity/")
def create_user_activity_route(user_activity: UserActivitySchema, session: SessionDep):
    return activities.create_user_activity(user_activity=user_activity, session=session)


@router.get("/user-activity/{user_id}")
def get_user_avtivities_route(user_id: uuid.UUID, session: SessionDep):
    return activities.get_user_activities(user_id=user_id, session=session)
