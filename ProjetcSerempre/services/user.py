from models.user import User as ModelUser
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserService:
    def __init__(self, db) -> None  :
        self.db = db
    
    def GetUsers(self):
        result = self.db.query(ModelUser).all()
        return result
    
    def GetUsersById(self, UserId: int):
        result = self.db.query(ModelUser).filter(ModelUser.id == UserId).first()
        return result
    
    def CreateUser(self, user):
        user.password = pwd_context.hash(user.password)  # Encriptar la contraseña antes de guardarla
        UserCreated = ModelUser(**user.dict())
        self.db.add(UserCreated)
        self.db.commit()
    
    def UpdateUser(self, UserId: int, user):
        result = self.db.query(ModelUser).filter(ModelUser.id == UserId).first()
        if result:
            result.name = user.name
            result.email = user.email
            result.password = pwd_context.hash(user.password)  # Encriptar la contraseña antes de guardarla
            result.jobtitle = user.jobtitle
            self.db.commit()
            return user.dict()
        else:
            return False
    
    def DeleteUser(self, UserId: int):
        result = self.db.query(ModelUser).filter(ModelUser.id == UserId).first()
        if result:
            self.db.delete(result)
            self.db.commit()
            return True
        else:
            return False