from enum import Enum


class UserRoleEnum(str, Enum):
    ADMIN = "admin"
    WAREHOUSE_WORKER = "warehouse_worker"
    LOGISTICS_SPECIALIST = "logistics_specialist"
    PRODUCTION_PLANNER = "production_planner"
