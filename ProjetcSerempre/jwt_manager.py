from jwt import encode, decode
from dotenv import load_dotenv
from fastapi.responses import JSONResponse
import os
import datetime

# Carga las variables de entorno del archivo .env
load_dotenv()

def create_token(data: dict, expire_seconds= 28800):
    secret_key = os.getenv("SECRET_KEY")
    
    # Elimina la contraseña del diccionario
    if "password" in data:
        del data["password"]

    # Agrega el campo 'exp' a la carga útil del token
    exp_time = datetime.datetime.utcnow() + datetime.timedelta(seconds=expire_seconds)  # El token expira en expire_seconds segundos
    data["exp"] = exp_time

    token: str = encode(payload=data, key=secret_key, algorithm="HS256")

    # Devuelve el token como un objeto JSON
    return {"token": token}

def validate_token(token: str)  -> dict:
    secret_key = os.getenv("SECRET_KEY")
    data : dict = decode(token, secret_key, algorithms=["HS256"])
    return data