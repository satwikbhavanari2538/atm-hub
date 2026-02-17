from fastapi import FastAPI, HTTPException, Body, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from database import get_tasks_collection, get_agents_collection
from models import AgentTask, AgentStatus
from datetime import datetime, timedelta
from bson import ObjectId

app = FastAPI(title="King Claw API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/tasks", response_model=AgentTask)
async def create_task(task: AgentTask = Body(...)):
    tasks_collection = await get_tasks_collection()
    task_dict = jsonable_encoder(task)
    # Ensure created_at is set if not provided
    if not task_dict.get("created_at"):
        task_dict["created_at"] = datetime.utcnow()
    new_task = await tasks_collection.insert_one(task_dict)
    created_task = await tasks_collection.find_one({"_id": new_task.inserted_id})
    return created_task

@app.patch("/tasks/{task_id}", response_model=AgentTask)
async def update_task(task_id: str, updates: dict = Body(...)):
    tasks_collection = await get_tasks_collection()
    if not ObjectId.is_valid(task_id):
        raise HTTPException(status_code=400, detail="Invalid task ID")
    
    # If status is updated to completed/failed, we might want to handle it specifically
    # Based on user request: "done task will be remove from the db"
    if updates.get("status") in ["completed", "done"]:
        await tasks_collection.delete_one({"_id": ObjectId(task_id)})
        return JSONResponse(status_code=200, content={"message": "Task completed and removed from storage"})

    result = await tasks_collection.update_one(
        {"_id": ObjectId(task_id)}, {"$set": updates}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
        
    updated_task = await tasks_collection.find_one({"_id": ObjectId(task_id)})
    return updated_task

@app.get("/tasks", response_model=List[AgentTask])
async def list_tasks():
    tasks_collection = await get_tasks_collection()
    # Only show last 24 hours of tasks
    time_threshold = datetime.utcnow() - timedelta(hours=24)
    query = {"created_at": {"$gte": time_threshold}}
    return await tasks_collection.find(query).to_list(1000)

@app.get("/agents", response_model=List[AgentStatus])
async def list_agents():
    agents_collection = await get_agents_collection()
    return await agents_collection.find().to_list(100)

@app.get("/activity")
async def list_activity():
    # In a real scenario, this might be a separate collection
    # For now, we'll return a filtered history from tasks if we had one, 
    # but since we delete tasks, let's keep a mock for UI structure until we add an Activity log collection.
    return []

@app.get("/")
async def root():
    return {"message": "King Claw Backend is Online"}
