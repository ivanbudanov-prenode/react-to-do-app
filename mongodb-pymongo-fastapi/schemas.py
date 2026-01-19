from pydantic import BaseModel, Field
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated
from typing import Optional, List

PyObjectId = Annotated[str, BeforeValidator(str)]

class TaskModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(...)
    isEditing: bool = Field(...)
    isChecked: bool = Field(...)

    class Config: from_attributes = True

class TaskCollection(BaseModel):
    data: List[TaskModel]
    class Config: from_attributes = True

class TaskUpdate(BaseModel):
    id: str = Field(...)
    name: str = Field(...)
    isEditing: bool = Field(...)
    isChecked: bool = Field(...)

    class Config: from_attributes = True

class TaskOut(BaseModel):
    data: TaskModel
    class Config: from_attributes = True

