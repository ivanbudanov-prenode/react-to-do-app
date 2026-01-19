from typing import Optional, List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pydantic.functional_validators import BeforeValidator
import pymongo
from typing_extensions import Annotated
from bson import ObjectId
from pymongo import AsyncMongoClient
import os
from dotenv import load_dotenv

load_dotenv()

user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
MONGODB_URL = f"mongodb+srv://{user}:{password}@cluster0.8uzkrrx.mongodb.net/?appName=Cluster0"

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
tasks_collection = db.get_collection("tasks")

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
    response_description="List tasks",
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
    update_result = await tasks_collection.update_one({"_id": ObjectId(updated_task.id)}, {"$set": updated_task.dict(exclude={"id"})})
    return {"data": {"id": PyObjectId(updated_task.id), "name": updated_task.name, "isEditing": updated_task.isEditing, "isChecked": updated_task.isChecked}}

'''
@app.post(
    "/tasks",
    response_description="Create task",
    response_model=TaskOut,
    response_model_by_alias=False,
)
async def create_task(new_task: TaskModel):
    create_result = await tasks_collection.insert_one(new_task.dict(exclude={"id"}))
    print("created: ", {"data": {"id": PyObjectId(str(create_result.inserted_id)), "name": new_task.name, "isEditing": new_task.isEditing, "isChecked": new_task.isChecked}})
    return {"data": {"id": PyObjectId(str(create_result.inserted_id)), "name": new_task.name, "isEditing": new_task.isEditing, "isChecked": new_task.isChecked}}
'''
