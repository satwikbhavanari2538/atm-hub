import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

async def test_connection():
    load_dotenv()
    uri = os.getenv("MONGODB_URI")
    print(f"Connecting to MongoDB...")
    client = None
    try:
        client = AsyncIOMotorClient(uri)
        # The ismaster command is cheap and does not require auth.
        await client.admin.command('ismaster')
        print("✅ MongoDB connection successful!")
        
        db = client.atm_db
        collection = db.test_collection
        
        # Test write
        print("Testing write...")
        result = await collection.insert_one({"test": "data", "timestamp": "now"})
        print(f"Inserted document with ID: {result.inserted_id}")
        
        # Test read
        print("Testing read...")
        doc = await collection.find_one({"_id": result.inserted_id})
        print(f"Read document: {doc}")
        
        # Cleanup
        print("Cleaning up...")
        await collection.delete_one({"_id": result.inserted_id})
        print("Cleanup successful.")
        
    except Exception as e:
        print(f"❌ Connection failed: {e}")
    finally:
        if client:
            client.close()

if __name__ == "__main__":
    asyncio.run(test_connection())
