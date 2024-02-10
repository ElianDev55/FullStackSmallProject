from typing import Optional
from pydantic import BaseModel, Field


class User(BaseModel):
    id: Optional[int] = None
    name: str = Field(max_length=50)
    email: str = Field(max_length=50)
    password: str = Field(max_length=50)
    jobtitle: str = Field(max_length=50)

class UserLogin(BaseModel):
    email: str = Field(max_length=50)
    password: str = Field(max_length=50)

    class Config:
        schema_extra = {
            "example": {
                "id": 1,
                "name": "John Doe",
                "email": "john@gmail.com",
                "password" : "123456",
                "jobtitle": "Developer"
                }
        }
