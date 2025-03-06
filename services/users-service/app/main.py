from fastapi import FastAPI

app = FastAPI()

@app.get('/')
async def index():
    return {"service": "users"}

@app.get('/users')
async def users():
    return {"endpoint": "users list"}
