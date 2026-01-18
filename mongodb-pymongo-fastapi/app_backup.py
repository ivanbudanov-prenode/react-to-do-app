'''import os
from typing import Optional, List

from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import Response
from pydantic import ConfigDict, BaseModel, Field, EmailStr
from pydantic.functional_validators import BeforeValidator

import pymongo
from typing_extensions import Annotated

from bson import ObjectId
import asyncio
from pymongo import AsyncMongoClient
from pymongo import ReturnDocument


MONGODB_URL = "mongodb+srv://Ivan:password123password123@cluster0.8uzkrrx.mongodb.net/?appName=Cluster0"

app = FastAPI()
@app.get("/")
async def root():
    return {"message": "Hello World"}

client = AsyncMongoClient(os.environ["MONGODB_URL"],server_api=pymongo.server_api.ServerApi(version="1", strict=True,deprecation_errors=True))
db = client.test_db
print("Database:" + db)
tasks_collection = db.get_collection("tasks")
print("Collection:" + tasks_collection)


PyObjectId = Annotated[str, BeforeValidator(str)]




@app.get(
    "/tasks",
    response_description="List all tasks",
    response_model=TaskCollection,
    response_model_by_alias=False,
)
async def list_tasks():
    return TaskCollection(tasks=await tasks_collection.find().to_list(1000))


class TaskModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(...)
    email: EmailStr = Field(...)
    isEditing: bool = Field(...)
    isChecked: bool = Field(...)


class TaskCollection(BaseModel):
    tasks: List[TaskModel]
'''