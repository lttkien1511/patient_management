from fastapi import APIRouter, Request, Depends, HTTPException, status, Response
from Model.Mongo import Mongo
from Helper.Reply import Reply
from Helper.Default import *
from bson import ObjectId
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import random

security = HTTPBasic()
router = APIRouter()

collection1 = 'admin'
collection2 = 'session'
model1 = Mongo(collection=collection1)
model2 = Mongo(collection=collection2)

def authenticate_user(credentials: HTTPBasicCredentials = Depends(security)):
    user = model1.collection.find_one({"username": credentials.username})
    if user is None or user['password'] != credentials.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return user

def create_session(user_id: ObjectId):
    session_data = {
        "user_id": user_id,
        "session_id": random.randint(0, 1000000)
    }
    session_id = model2.collection.insert_one(session_data).inserted_id
    return str(session_data["session_id"])
    

#Custom middleware for session-based authentication
def get_authenticated_user_from_session_id(request: Request):
    try:
        session_id = int(request.cookies.get("session_id"))
        sessionData = model2.collection.find_one({"session_id":session_id})
        if(sessionData is None): raise Exception("Invalid session id")
        userId = sessionData['user_id']
        userData = model1.collection.find_one({'_id':userId}, {"_id":0, "password":0})
        return userData
        
    except Exception as e:
        raise HTTPException(
                status_code=401,
                detail=str(e),
            )



def get_session_id(request: Request):
    session_id = request.cookies.get("session_id")
    return int(session_id)



@router.post("/login")
async def login(response:Response,  user: dict= Depends(authenticate_user)):
    try:
        model2.collection.delete_many({"user_id":user['_id']})
        session_id = create_session(user['_id'])
        response.set_cookie(key='session_id', value=session_id)
        return Reply.make(True, 'Success', session_id)
    except Exception as e:
        return Reply.make(False, e)

@router.get("/getusers/me")
def read_current_user(user: dict = Depends(get_authenticated_user_from_session_id)):
    try:
        return Reply.make(True, 'Success', user)
    except Exception as e:
        return Reply.make(False, e)

@router.post("/logout")
async def logout(session_id: int = Depends(get_session_id)):
    model2.collection.delete_one({"session_id":session_id})
    return Reply.make(True, 'Success')


@router.post("/changePassword")
async def changepassword(newPassword:str, session_id: int = Depends(get_session_id)):
    sessionData = model2.collection.find_one({"session_id":session_id})
    if(sessionData is None): raise Exception("Invalid session id")
    userId = sessionData['user_id']
    model2.collection.delete_many({"user_id":userId})
    model1.collection.update_one({"_id":ObjectId(userId)}, {"$set":{"password":newPassword}})
    return Reply.make(True, 'Success')
