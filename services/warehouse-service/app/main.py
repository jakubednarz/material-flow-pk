from fastapi import FastAPI

app = FastAPI()

@app.get('/')
async def index():
    return {"service": "warehouse"}

@app.get('/warehouse')
async def users():
    return {"endpoint": "warehouse list"}