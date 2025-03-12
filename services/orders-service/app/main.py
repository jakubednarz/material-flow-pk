from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def index():
    return {"service": "orders"}


@app.get("/orders")
async def users():
    return {"endpoint": "orders list"}
