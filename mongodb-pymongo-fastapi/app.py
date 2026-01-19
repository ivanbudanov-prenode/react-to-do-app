from typing import Optional, List

from fastapi import FastAPI, Body, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import ConfigDict, BaseModel, Field, EmailStr
from pydantic.functional_validators import BeforeValidator

import pymongo
from typing_extensions import Annotated

from bson import ObjectId
import asyncio
from pymongo import AsyncMongoClient
from pymongo import ReturnDocument

import os

MONGODB_URL = "mongodb+srv://Ivan:password123password123@cluster0.8uzkrrx.mongodb.net/?appName=Cluster0"

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = AsyncMongoClient(MONGODB_URL,server_api=pymongo.server_api.ServerApi(version="1", strict=True,deprecation_errors=True))
db = client.test_db
print("db: ")
print(db)
tasks_collection = db.get_collection("tasks")
print("tasks_collection: ")
print(tasks_collection)


PyObjectId = Annotated[str, BeforeValidator(str)]

@app.get("/")
async def root():
    return {"message": "Hello World"}


class TaskModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(...)
    isEditing: bool = Field(...)
    isChecked: bool = Field(...)

    class Config: from_attributes = True

class TaskCollection(BaseModel):
    data: List[TaskModel]
    class Config: from_attributes = True

@app.get(
    "/tasks",
    response_description="List first task",
    response_model=TaskCollection,
    response_model_by_alias=False,
)
async def list_tasks():
    listResult = await tasks_collection.find().to_list(1000)
    return {"data": listResult}



class TaskUpdate(BaseModel):
    id: str = Field(...)
    name: str = Field(...)
    isEditing: bool = Field(...)
    isChecked: bool = Field(...)

    class Config: from_attributes = True

class TaskOut(BaseModel):
    data: TaskModel
    class Config: from_attributes = True

@app.put(
    "/tasks",
    response_description="Update task",
    response_model=TaskOut,
    response_model_by_alias=False,
)
async def update_task(updated_task: TaskUpdate):
    print("updated_task: ", updated_task)
    update_result = await tasks_collection.update_one({"_id": ObjectId(updated_task.id)}, {"$set": updated_task.dict(exclude={"id"})})
    print("update_result: ", update_result)
    return {"data": {"id": PyObjectId(updated_task.id), "name": updated_task.name, "isEditing": updated_task.isEditing, "isChecked": updated_task.isChecked}}

