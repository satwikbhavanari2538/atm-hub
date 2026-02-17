from fastapi import FastAPI, HTTPException, Body, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
from .database import get_tasks_collection, get_agents_collection
from .models import AgentTask, AgentStatus
from datetime import datetime

app = FastAPI(title="ATM API")

@app.post("/tasks", response_description="Add new task", response_model=AgentTask)
async def create_task(task: AgentTask = Body(...)):
    tasks_collection = await get_tasks_collection()
    task = jsonable_encoder(task)
    new_task = await tasks_collection.insert_one(task)
    created_task = await tasks_collection.find_one({"_id": new_task.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_task)

@app.get("/tasks", response_description="List all tasks", response_model=List[AgentTask])
async def list_tasks():
    tasks_collection = await get_tasks_collection()
    tasks = await tasks_collection.find().to_list(1000)
    return tasks

@app.get("/tasks/{id}", response_description="Get a single task", response_model=AgentTask)
async def show_task(id: str):
    tasks_collection = await get_tasks_collection()
    if (task := await tasks_collection.find_one({"_id": id})) is not None:
        return task
    raise HTTPException(status_code=404, detail=f"Task {id} not found")

@app.get("/agents", response_description="List all agents", response_model=List[AgentStatus])
async def list_agents():
    agents_collection = await get_agents_collection()
    agents = await agents_collection.find().to_list(100)
    return agents

@app.get("/")
async def root():
    return {"message": "ATM Backend is Online"}
