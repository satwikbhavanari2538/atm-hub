from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
client = AsyncIOMotorClient(MONGODB_URI)
db = client.atm_db

async def get_tasks_collection():
    return db.tasks

async def get_agents_collection():
    return db.agents
