from fastapi import APIRouter, FastAPI, HTTPException, Request
from pydantic import BaseModel, Field
from jwt_manager import create_token, validate_token
from fastapi.security import HTTPBearer
from config.database import Session, engine, Base
from models.user import User as ModelUser
from fastapi.responses import JSONResponse
from typing import Optional
from fastapi.encoders import jsonable_encoder
from middleware.error_handler import ErrorHandler
from middleware.jwt_bearer import JWTBearer
from services.user import UserService
from Shemas.UserShema import User, UserLogin
from passlib.context import CryptContext
from fastapi import Depends

UserRouter = APIRouter()

db = Session()



pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



@UserRouter.post("/login", tags=["auth"])
def login(user: UserLogin):
    result = db.query(ModelUser).filter(ModelUser.email == user.email).first()
    if result and pwd_context.verify(user.password, result.password):
        return create_token(user.dict())
    else:
        raise HTTPException(status_code=401, detail="Credenciales son invalidas")



@UserRouter.get("/users/me", tags=["users"], response_model=User, status_code=200, dependencies=[Depends(JWTBearer())])
def read_users_me(request: Request):
    token = request.headers.get('Authorization').replace('Bearer ', '')
    payload = validate_token(token)
    user_email = payload.get('email')
    result = db.query(ModelUser).filter(ModelUser.email == user_email).first()
    try:
        if result:
            return JSONResponse(status_code=200, content= jsonable_encoder(result))
        else:
            return JSONResponse(status_code=404, content={"message": "User not found"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": "Internal server error"})




#-------------------------CRUD---------------------------------
@UserRouter.get("/users", tags=["users"], response_model=list[User], status_code=200, )

def AllUsers():
    
    result = UserService(db).GetUsers()
    try:
        if result:
            return JSONResponse(status_code=200, content= jsonable_encoder(result))
        else:
            return JSONResponse(status_code=404, content={"message": "Users not found"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": "Internal server error"})
    



@UserRouter.get("/users/{UserId}", tags=["users"], response_model=User, status_code=200, dependencies=[Depends(JWTBearer())])

def ReadUser(UserId: int) -> User:
    
    result = UserService(db).GetUsersById(UserId)
    try:
        if result:
            return JSONResponse(status_code=200, content= jsonable_encoder(result))
        else:
            return JSONResponse(status_code=404, content={"message": "User not found"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": "Internal server error"})



@UserRouter.post("/users", tags=["users"], response_model=dict, status_code=201, )

def CreateUser(user: User):
    UserService(db).CreateUser(user)
    return JSONResponse(status_code=201, content={"message": "User created"})



@UserRouter.put("/users/{UserId}", tags=["users"], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())] )
def UpdateUser(UserId: int, user: User)-> dict :
    result = UserService(db).GetUsersById(UserId)
    try:
        if result:
            UserService(db).UpdateUser(UserId, user)
            return JSONResponse(status_code=200, content= user.dict())
        else:
            return JSONResponse(status_code=404, content={"message": "User not found"})
    except Exception as e:
        db.rollback()
        return JSONResponse(status_code=500, content={"message": "Internal server error"})



@UserRouter.delete("/users/{UserId}", tags=["users"], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def DeleteUsers(UserId: int)-> dict :
    result = UserService(db).GetUsersById(UserId)
    try:
        if result:
            UserService(db).DeleteUser(UserId)
            return JSONResponse(status_code=200, content={"message": "User deleted"})
        else:
            return JSONResponse(status_code=404, content={"message": "User not found"})
    except Exception as e:
        db.rollback()
        return JSONResponse(status_code=500, content={"message": "Internal server error"})
