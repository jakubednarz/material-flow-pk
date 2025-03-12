import uuid
from ..database import SessionDep
from ..models.users import UserActivity
from ..schemas.activities import UserActivitySchema
from fastapi import HTTPException
from sqlmodel import select



def create_user_activity(user_activity: UserActivitySchema, session: SessionDep):
    db_user_activity = UserActivity(**user_activity.model_dump())
    session.add(db_user_activity)
    session.commit()
    session.refresh(db_user_activity)
    return db_user_activity


def get_user_activities(user_id: uuid.UUID, session: SessionDep):
    statement = select(UserActivity).where(UserActivity.user_id == user_id)
    user_activities = session.exec(statement).all()

    if not user_activities:
        raise HTTPException(status_code=404, detail="No activities found for this user")

    return [
        UserActivitySchema.model_validate(activity.model_dump()) 
        for activity in user_activities
    ]
