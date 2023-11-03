from fastapi import FastAPI, Depends, HTTPException, status,  Response, Query
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import random
from fastapi import Request
from fastapi import Body
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from pydantic import BaseModel
from datetime import datetime, date
from enum import Enum
from typing import List
#from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse




db_connection = MongoClient("mongodb://localhost:27017/")
db = db_connection.co_so_du_lieu_benh_nhan
collection = db['admin']
session = db['session']
patient = db['benh_nhan']
nhomthuthuat = db['nhom_thu_thuat']
thuthuat = db['thu_thuat']



security = HTTPBasic()

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

class GenderEnum (str, Enum):
    male = "Nam"
    female = "Nữ"
    other = "Khác"



checkboxes = [
    "Chảy máu lâu",
    "Dị ứng Thuốc",
    "Thấp khớp",
    "Huyết áp",
    "Tim mạch",
    "Tiểu đường",
    "Dạ dày",
    "Phổi",
    "Truyền nhiễm",
    "Thai sản"
]


class patientInfo(BaseModel):
    name: str
    age: str
    gender:GenderEnum
    telephone: str
    address:str
    reason: str
    email: str
    birthday: str
    #inputdate: date = date.today()
    inputdate: str
    medical_history: List[str] 
    idnumber: int = None
    
#class nhomthuthuat(BaseModel):
    

class noidungthuthuat(BaseModel):
    ten_nhom_thu_thuat: str
    ten_thu_thuat:str
    don_gia:str
    giam_gia:str

history_state = {history: False for history in checkboxes}


def authenticate_user(credentials: HTTPBasicCredentials = Depends(security)):
    user = collection.find_one({"username": credentials.username})
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
    session_id = session.insert_one(session_data).inserted_id
    return str(session_data["session_id"])
    

#Custom middleware for session-based authentication
def get_authenticated_user_from_session_id(request: Request):
    try:
        session_id = int(request.cookies.get("session_id"))
        sessionData = session.find_one({"session_id":session_id})
        if(sessionData is None): raise Exception("Invalid session id")
        userId = sessionData['user_id']
        userData = collection.find_one({'_id':userId}, {"_id":0, "password":0})
        return userData
        
    except Exception as e:
        raise HTTPException(
                status_code=401,
                detail=str(e),
            )



def get_session_id(request: Request):
    session_id = request.cookies.get("session_id")
    return int(session_id)




# @app.post("/signup")
# async def sign_up(username: str = Body(...), password: str = Body(...)):
#     db = db_connection.co_so_du_lieu_benh_nhan
#     collection = db['admin']
#     user = collection.find_one({'username':username})
#     if user:
#         raise HTTPException(
#             status_code=status.HTTP_409_CONFLICT,
#             detail="Username already exists",
#         )
#     #new_user_id = len(users) + 1
#     new_user = {
#         "username": username,
#         "password": password,
#     }
    
#     userid = collection.insert_one(new_user)
#     print(userid)
#     return {"message": "User registered successfully"}
    


@app.post("/login")
async def login(response:Response,  user: dict= Depends(authenticate_user)):
    #db = db_connection.co_so_du_lieu_benh_nhan
    session.delete_many({"user_id":user['_id']})
    session_id = create_session(user['_id'])
    response.set_cookie(key='session_id', value=session_id)
    return {'message': 'Logged in successfully', 'session_id': session_id}

@app.get("/getusers/me")
def read_current_user(user: dict = Depends(get_authenticated_user_from_session_id)):
    return user


@app.post("/logout")
async def logout(session_id: int = Depends(get_session_id)):
    #db = db_connection.co_so_du_lieu_benh_nhan
    #session = db['session']
    session.delete_one({"session_id":session_id})
    return {"message": "Logged out successfully"}


@app.post("/changePassword")
async def changepassword(newPassword:str, session_id: int = Depends(get_session_id)):
    
    sessionData = session.find_one({"session_id":session_id})
    if(sessionData is None): raise Exception("Invalid session id")
    userId = sessionData['user_id']
    session.delete_many({"user_id":userId})
    collection.update_one({"_id":ObjectId(userId)}, {"$set":{"password":newPassword}})
    return {"message": "Change password successfully"}



@app.post("/addpatient")
async def addpatient ( patient_data: patientInfo = Body(...)):
    randomid = patient_data.idnumber
    randomid = random.randint(100000,999999)
    birthday_date = datetime.strptime(patient_data.birthday, "%Y-%m-%d")
    input_date = datetime.strptime(patient_data.inputdate, "%Y-%m-%d")
    #input_date = date()
    #updated_checkbox = []
    medicalhistory = patient_data.medical_history
    if patient_data.gender == GenderEnum.male:
        gender_str = "Nam"
    elif patient_data.gender == GenderEnum.female:
        gender_str = "Nữ"
    else:
        gender_str = "Khác"

    for history in checkboxes:
        history_state[history] = history in medicalhistory
    
    patient_data = {
        "name": patient_data.name,
        "age": patient_data.age,
        "gender": gender_str,
        "telephone": patient_data.telephone,
        "address":patient_data.address,
        "reason": patient_data.reason,
        "email": patient_data.email,
        "birthday": birthday_date,
        "input_date":input_date,
        "medical_history":medicalhistory,
        "idnumber": randomid
        
    }
    newpatient = patient.insert_one(patient_data)
    return {"message": "Benh nhan moi da duoc them vao"}

@app.post("/filter/")
async def filter_data(patientdata: dict = Body(...)):
    # input: {
    #     page:1,
    #     limit:10,
    #     filter_type: "and/or",
    #     sort_field:"name",
    #     sort_direct:"-1",
    #     condition: {
    #         "telephone": {
    #             "logic":"=",
    #             "value": "01232345345"
    #         },
    #         "name": {
    #             "logic":"like",
    #             "value": "kien"
    #         }
    #     }
    # }
    # return {
    #     data:[],
    #     total: 1000,
    #     page: 5
    # }

    page = patientdata.get('page',1)
    limit = patientdata.get('limit',10)
    skip = (page-1)*limit

    filtercondition = {}
    
    if patientdata.get("filter_type", "and") == "and":
        for col in patientdata['condition']:
            if(patientdata['condition'][col]['logic'] == "="):
                filtercondition[col] = patientdata["condition"][col]['value']
            elif(patientdata["condition"][col]['logic'] == "like"):
                #filtercondition[col] = {"$regex": patientdata["condition"][col]['value']}
                filtercondition[col] = {"$regex": patientdata["condition"][col]['value'],"$options":"i"}
    
    total = patient.count_documents(filtercondition)
    data = patient.find(filtercondition).skip(skip).limit(limit)
    #print(total)
    sortField = patientdata.get('sort_field', None)
    sortDirect = int(patientdata.get('sort_direct',1))
    #print(data)
    if (sortField is not None):
        data.sort([(sortField, sortDirect)])

    data = list(data)
    #print(data)
    for item in data:
        item['_id'] = str(item['_id'])
    return {
        "data" : data,
        "total": total,
        "page": page
    }


# @app.patch("/update")
# async def updatedata(idnumber: int, patientdata: dict = Body(...)):
#     document = patient.find_one({"idnumber":idnumber})
#     for key,value in patientdata.items():
#         document[key] = value
#     patient.save(document)

# @app.patch("/update")
# async def updatedata(idnumber: int, patientdata: patientInfo = Body(...)):
#     stored_item_data = patient[idnumber]
#     stored_item_model = patientdata(**stored_item_data)
#     update_data = patientdata.dict(exclude_unset=True)
#     updated_item = stored_item_model.copy(update=update_data)
#     patient[idnumber] = jsonable_encoder(updated_item)
#     return updated_item

@app.patch("/update")
async def updatedata(idnumber: int, patientdata: patientInfo = Body(...)):
    result = patient.update_one(
        {"idnumber": idnumber},
        {"$set": {
            "name": patientdata.name,
            "age": patientdata.age,
            "gender": patientdata.gender,
            "telephone": patientdata.telephone,
            "address":patientdata.address,
            "reason": patientdata.reason,
            "email": patientdata.email,
            "birthday": patientdata.birthday,
            "input_date":patientdata.inputdate,
        
            "medical_history":patientdata.medical_history,
        }}
    )
    if result.modified_count > 0:
        return {"message": "Patient updated"}
    else:
        return {"message": "Patient not found"}
    
@app.delete("/delete")
async def deletedata(idnumber: int):
    patient.delete_one({"idnumber":idnumber})
    return {"message": "Delete patient successfully!"}

@app.get("/getAllData/{idnumber}")
async def getAllData(idnumber:int):
    patientdata = patient.find_one({"idnumber":idnumber})
    if(patientdata is None): raise Exception("Invalid session id")
    #print(patientdata)
    patientid = patientdata['idnumber']
    datainfo = patient.find_one({'idnumber':patientid},{
        "_id":0,
        "telephone":0, 
        "email":0,
        "input_date":0
        })
    #print(datainfo)
    return datainfo

@app.post('/addnhomthuthuat')
async def addnhomthuthuat(thuthuatgroup:str):
    newthuthuatgroup = {
        "ten_nhom_thu_thuat":thuthuatgroup
    }
    newnhomthuthuat = nhomthuthuat.insert_one(newthuthuatgroup)
    return {"message": "Thu thuat moi da duoc them vao"}


@app.post('/addthuthuat')
async def addthuthuat(id:str,  thuthuatdata : noidungthuthuat = Body(...)):
    nhomthuthuatid = nhomthuthuat.find_one({"_id":ObjectId(id)})
    #namenhomthuthuat = nhomthuthuat.find_one({"ten_nhom_thu_thuat": })
    print(nhomthuthuatid)
    thuthuatid = nhomthuthuatid['_id']
    tennhomthuthuat = nhomthuthuatid['ten_nhom_thu_thuat']

    dulieuthuthuat = {
        "thuthuatid": thuthuatid,
        "ten_nhom_thu_thuat": tennhomthuthuat,
        "ten_thu_thuat": thuthuatdata.ten_thu_thuat,
        "don_gia": thuthuatdata.don_gia,
        "giam_gia": thuthuatdata.giam_gia

    }
    thuthuatmoi = thuthuat.insert_one(dulieuthuthuat)
    
    return {"message":"Thu thuat moi da duoc them vao"}

# @app.get('/ten_nhom_thu_thuat')
# async def ten_nhom_thu_thuat(nhomthuthuatid: str):
#     nhomthuthuatid_obj = ObjectId(nhomthuthuatid)
#     idthuthuat = thuthuat.find_one({"thuthuatid":nhomthuthuatid_obj})
#     if idthuthuat is None:
#             return {"message": "Thuthuat not found"}
#     thuthuatid = idthuthuat['thuthuatid']
#     tennhomthuthuat = thuthuat.find_one({"thuthuatid":thuthuatid},{
#         "ten_thu_thuat":0,
#         "don_gia":0,
#         "giam_gia":0
#     })
#     return tennhomthuthuat
# @app.get('/ten_nhom_thu_thuat')
# async def ten_nhom_thu_thuat(nhomthuthuatid: str):
#     try:
#         nhomthuthuatid_obj = ObjectId(nhomthuthuatid)
#         idthuthuat = thuthuat.find_one({"thuthuatid": nhomthuthuatid_obj})
        
#         if idthuthuat is None:
#             return {"message": "Thuthuat not found"}
        
#         thuthuatid = idthuthuat['thuthuatid']
#         tennhomthuthuat = thuthuat.find_one({"thuthuatid": thuthuatid},{
#             "_id":0,
#             "ten_thu_thuat":0,
#             "don_gia":0,
#             "giam_gia":0
#         })
#         if tennhomthuthuat:
#             tennhomthuthuat["thuthuatid"] = str(tennhomthuthuat["thuthuatid"])  
            
        
#         return tennhomthuthuat
#     except Exception as e:
#         return {"message": f"An error occurred: {str(e)}"}
#Lưu ý: phải convert từ ObjectId về lại String

@app.get("/getallnhomthuthuat")
async def getallnhomthuthuat():
    allgroup = list(nhomthuthuat.find({},{
        "_id": 1,
        "ten_nhom_thu_thuat": 1
    }))
    for group in allgroup:
        group['_id']  = str(group['_id'])
    return {"allgroup":allgroup}

@app.get("/getthuthuat/{nhomthuthuatid}")
async def getthuthuat(nhomthuthuatid:str):
    try:
        nhomthuthuatid_obj = ObjectId(nhomthuthuatid)
        idthuthuat = thuthuat.find_one({"thuthuatid":nhomthuthuatid_obj})
        if idthuthuat is None:
            return {"message": "Thuthuat not found"}
        thuthuatid = idthuthuat['thuthuatid']
        tenthuthuat = thuthuat.find({"thuthuatid": thuthuatid},{
            "_id":1,
            "ten_thu_thuat":1,
            "don_gia":1,
            "giam_gia":1
        })
        if not tenthuthuat:
            raise HTTPException(status_code=404, detail="Thuthuat data not found")
        
        tenthuthuat = [doc for doc in tenthuthuat]
        for ten in tenthuthuat:
            ten['_id'] = str(ten['_id'])
        #print(tenthuthuat)
        return tenthuthuat

        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.get("/thuthuatduocluachon/{id}")
async def thuthuatduocluachon(id:str):
    try:
        thuthuatid_obj = ObjectId(id)
        idthuthuat = thuthuat.find_one({"_id":thuthuatid_obj})
        if idthuthuat is None:
            return {"message": "Thu thuat not found"}
        #print(idthuthuat)
        thuthuatid = idthuthuat['_id']
        tenthuthuat = thuthuat.find({"_id": thuthuatid},{
            "_id":0,
            "ten_thu_thuat":1,
            "don_gia":1,
            "giam_gia":1
        })
        if not tenthuthuat:
            raise HTTPException(status_code=404, detail="Thuthuat data not found")

        tenthuthuat = [doc for doc in tenthuthuat]
        #print(tenthuthuat)
        return tenthuthuat

        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

