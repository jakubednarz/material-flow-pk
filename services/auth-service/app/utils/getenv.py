import os

from dotenv import load_dotenv


def get_env(name: str):
    load_dotenv()
    return os.getenv(name)
