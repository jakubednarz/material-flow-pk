import os
from dotenv import load_dotenv

def get_env(name):
    load_dotenv()
    return os.getenv(name)
