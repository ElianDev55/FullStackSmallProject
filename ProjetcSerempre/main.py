from fastapi import FastAPI
from  middleware.error_handler import ErrorHandler
from config.database import Session, engine, Base
from routers.user import UserRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.title = "Api Serempre"
app.version = "0.0.1"


Base.metadata.create_all(bind=engine)

app.add_middleware(ErrorHandler)
app.include_router(UserRouter)

origins = [
    "http://localhost:5173",  # Origen permitido
    # puedes agregar más orígenes si es necesario
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)