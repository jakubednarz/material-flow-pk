from fastapi import FastAPI

app = FastAPI()

@app.get('/')
async def index():
    return {"service": "analytics"}

@app.get('/analytics')
async def users():
    return {"endpoint": "analytics list"}