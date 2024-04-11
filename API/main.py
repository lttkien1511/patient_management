from fastapi import FastAPI, Depends, HTTPException, status,  Response, Query
from fastapi.security import HTTPBasic, HTTPBasicCredentials
# import random
# from fastapi import Request
# from fastapi import Body
# from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
# from bson import ObjectId
# from pydantic import BaseModel
# from datetime import datetime, date, timedelta
# from enum import Enum
# from typing import List

from Controller import patient, nhomthuthuat, thuthuat, donthuoc, notification, treatmentDetail, reminder, login



# db_connection = MongoClient("mongodb://localhost:27017/")
# db = db_connection.co_so_du_lieu_benh_nhan
# collection = db['admin']
# session = db['session']
# patient = db['benh_nhan']
#nhomthuthuat = db['nhom_thu_thuat']
#thuthuat = db['thu_thuat']
# thuthuattungbenhnhan = db['thu_thuat_tung_benh_nhan']
# donthuoc = db['don_thuoc']
# donthuoctungbenhnhan = db['don_thuoc_tung_benh_nhan']
# lichhen = db['lich_hen_tung_benh_nhan']
# notification = db['thong_bao']
# chitietkhambenh = db['chi_tiet_kham_benh']



security = HTTPBasic()

app = FastAPI()

app.include_router(patient.router, prefix='/patient')
app.include_router(nhomthuthuat.router, prefix='/nhomthuthuat')
app.include_router(thuthuat.router, prefix='/thuthuat')
app.include_router(donthuoc.router, prefix='/donthuoc')
app.include_router(notification.router, prefix='/notification')
app.include_router(treatmentDetail.router, prefix='/treatmentDetail')
app.include_router(reminder.router, prefix='/reminder')
app.include_router(login.router, prefix='/login')



origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

# class GenderEnum (str, Enum):
#     male = "Nam"
#     female = "Nữ"
#     other = "Khác"



# checkboxes = [
#     "Chảy máu lâu",
#     "Dị ứng Thuốc",
#     "Thấp khớp",
#     "Huyết áp",
#     "Tim mạch",
#     "Tiểu đường",
#     "Dạ dày",
#     "Phổi",
#     "Truyền nhiễm",
#     "Thai sản"
# ]


# class patientInfo(BaseModel):
#     name: str
#     age: str
#     gender:GenderEnum
#     telephone: str
#     address:str
#     reason: str
#     email: str
#     birthday: str
#     #inputdate: date = date.today()
#     inputdate: str
#     medical_history: List[str] 
#     idnumber: int = None
       

# class noidungthuthuat(BaseModel):
#     ten_nhom_thu_thuat: str | None = None
#     ten_thu_thuat:str | None = None
#     # giam_gia:int | None = None
#     # thanh_tien: int | None = None
#     don_gia:int | None = None
#     # so_luong: int | None = None

# class thuthuatcanhan(BaseModel):
#     idnumber: int | None = None
#     thuthuatid: str
#     ten_thu_thuat:str
#     thanh_tien: int
#     don_gia:int
#     so_luong: int
#     ngaykham: str | None = None

# class PersonEnum(str, Enum):
#     bsLan = "BS Lan"
#     bsMy = "BS Mỹ"

# class danhsachdonthuoc(BaseModel):
#     idnumber: int | None = None
#     donthuoc_id: str | None = None
#     donthuoc: str | None = None
#     donvi: str | None = None
#     soluong: int | None = None
#     huongdan: str | None = None
#     ngayke: str | None = None
#     nguoike: PersonEnum | None = None

# class lichhenchobenhnhan(BaseModel):
#     idnumber: int
#     tenbenhnhan: str | None = None
#     lich_hen: str | None = None
#     reminder_time : str | None = None

# class PatientNotification(BaseModel):
#     #noti_id: str | None = None
#     sendtime: str | None = None
#     idnumber: int
#     tenbenhnhan: str | None = None
#     read: bool | None = None
#     notificationType: dict | None = None

# class ChiTietKhamBenh(BaseModel):
#     idnumber: int | None = None
#     thuthuatid: str
#     tooth_number: str | None = None
#     ten_thu_thuat: str | None = None
#     noi_dung_thu_thuat: str | None = None
#     so_luong: int | None = None
#     don_gia: int | None = None
#     thanh_tien: int | None = None
#     percent: int | None = None
#     giam_gia: int | None = None
#     lydogiam: str | None = None
#     ngaykham: str | None = None




# history_state = {history: False for history in checkboxes}


# def authenticate_user(credentials: HTTPBasicCredentials = Depends(security)):
#     user = collection.find_one({"username": credentials.username})
#     if user is None or user['password'] != credentials.password:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid credentials",
#             headers={"WWW-Authenticate": "Basic"},
#         )
#     return user

# def create_session(user_id: ObjectId):
#     session_data = {
#         "user_id": user_id,
#         "session_id": random.randint(0, 1000000)
#     }
#     session_id = session.insert_one(session_data).inserted_id
#     return str(session_data["session_id"])
    

# #Custom middleware for session-based authentication
# def get_authenticated_user_from_session_id(request: Request):
#     try:
#         session_id = int(request.cookies.get("session_id"))
#         #session_id = request.cookies.get("session_id")
#         sessionData = session.find_one({"session_id":session_id})
#         if(sessionData is None): raise Exception("Invalid session id")
#         userId = sessionData['user_id']
#         userData = collection.find_one({'_id':userId}, {"_id":0, "password":0})
#         return userData
        
#     except Exception as e:
#         raise HTTPException(
#                 status_code=401,
#                 detail=str(e),
#             )



# def get_session_id(request: Request):
#     session_id = request.cookies.get("session_id")
#     return int(session_id)



# @app.post("/login")
# async def login(response:Response,  user: dict= Depends(authenticate_user)):
#     #db = db_connection.co_so_du_lieu_benh_nhan
#     session.delete_many({"user_id":user['_id']})
#     session_id = create_session(user['_id'])
#     response.set_cookie(key='session_id', value=session_id)
#     return {'message': 'Logged in successfully', 'session_id': session_id}

# @app.get("/getusers/me")
# def read_current_user(user: dict = Depends(get_authenticated_user_from_session_id)):
#     return user


# @app.post("/logout")
# async def logout(session_id: int = Depends(get_session_id)):
#     #db = db_connection.co_so_du_lieu_benh_nhan
#     #session = db['session']
#     session.delete_one({"session_id":session_id})
#     return {"message": "Logged out successfully"}


# @app.post("/changePassword")
# async def changepassword(newPassword:str, session_id: int = Depends(get_session_id)):
    
#     sessionData = session.find_one({"session_id":session_id})
#     if(sessionData is None): raise Exception("Invalid session id")
#     userId = sessionData['user_id']
#     session.delete_many({"user_id":userId})
#     collection.update_one({"_id":ObjectId(userId)}, {"$set":{"password":newPassword}})
#     return {"message": "Change password successfully"}



# @app.post("/addpatient")
# async def addpatient ( patient_data: patientInfo = Body(...)):
#     randomid = patient_data.idnumber
#     randomid = random.randint(100000,999999)
#     birthday_date = datetime.strptime(patient_data.birthday, "%Y-%m-%d")
#     new_birthday_date = birthday_date.strftime("%d/%m/%Y")
    
#     input_date = datetime.now()
#     homnay = input_date.strftime("%d/%m/%Y")
#     medicalhistory = patient_data.medical_history
#     if patient_data.gender == GenderEnum.male:
#         gender_str = "Nam"
#     elif patient_data.gender == GenderEnum.female:
#         gender_str = "Nữ"
#     else:
#         gender_str = "Khác"

#     for history in checkboxes:
#         history_state[history] = history in medicalhistory
#     # ngay = datetime.now()
#     # homnay=ngay.strftime("%d/%m/%Y")
#     patient_data = {
#         "name": patient_data.name,
#         "age": patient_data.age,
#         "gender": gender_str,
#         "telephone": patient_data.telephone,
#         "address":patient_data.address,
#         "reason": patient_data.reason,
#         "email": patient_data.email,
#         "birthday": new_birthday_date,
#         #"input_date":input_date,
#         'input_date': homnay,
#         "medical_history":medicalhistory,
#         "idnumber": randomid
        
#     }
#     newpatient = patient.insert_one(patient_data)
#     return {"message": "Benh nhan moi da duoc them vao"}

# @app.post("/filter/")
# async def filter_data(patientdata: dict = Body(...)):
    # input: {
        # page:1,
        # limit:10,
        # filter_type: "and/or",
        # sort_field:"name",
        # sort_direct:"-1",
        # condition: {
        #     "telephone": {
        #         "logic":"=",
        #         "value": "01232345345"
        #     },
        #     "name": {
        #         "logic":"like",
        #         "value": "kien"
        #     }
        # }
    # }
    # return {
    #     data:[],
    #     total: 1000,
    #     page: 5
    # }

    # page = patientdata.get('page',1)
    # limit = patientdata.get('limit',10)
    # skip = (page-1)*limit

    # filtercondition = {}
    
    # if patientdata.get("filter_type", "and") == "and":
    #     for col in patientdata['condition']:
    #         if(patientdata['condition'][col]['logic'] == "="):
    #             filtercondition[col] = patientdata["condition"][col]['value']
    #         elif(patientdata["condition"][col]['logic'] == "like"):
    #             #filtercondition[col] = {"$regex": patientdata["condition"][col]['value']}
    #             filtercondition[col] = {"$regex": patientdata["condition"][col]['value'],"$options":"i"}
    
    # total = patient.count_documents(filtercondition)
    # data = patient.find(filtercondition).skip(skip).limit(limit)
    # #print(total)
    # sortField = patientdata.get('sort_field', None)
    # sortDirect = int(patientdata.get('sort_direct',1))
    # #print(data)
    # if (sortField is not None):
    #     data.sort([(sortField, sortDirect)])

    # data = list(data)
    # #print(data)
    # for item in data:
    #     item['_id'] = str(item['_id'])
    # return {
    #     "data" : data,
    #     "total": total,
    #     "page": page
    # }

# @app.get('/getallpatient')
# async def getallpatient(page: int = 1, limit: int = 10):
#     skip = (page-1) * limit
#     data = list(patient.find({},{
#         "_id":1,
#         "idnumber":1,
#         "name":1,
#         "age":1,
#         "gender":1,
#         "telephone":1,
#         "address":1,
#         "reason":1,
#         "input_date":1
#     }).skip(skip).limit(limit))
#     for i in data:
#         i['_id'] = str(i['_id'])
#     #print(data)

#     return data
   

# @app.patch("/update")
# async def updatedata(idnumber: int, patientdata: patientInfo = Body(...)):
#     result = patient.update_one(
#         {"idnumber": idnumber},
#         {"$set": {
#             "name": patientdata.name,
#             "age": patientdata.age,
#             "gender": patientdata.gender,
#             "telephone": patientdata.telephone,
#             "address":patientdata.address,
#             "reason": patientdata.reason,
#             "email": patientdata.email,
#             "birthday": patientdata.birthday,
#             "input_date":patientdata.inputdate,
        
#             "medical_history":patientdata.medical_history,
#         }}
#     )
#     if result.modified_count > 0:
#         return {"message": "Patient updated"}
#     else:
#         return {"message": "Patient not found"}
    
# @app.delete("/delete")
# async def deletedata(idnumber: int):
#     patient.delete_one({"idnumber":idnumber})
#     return {"message": "Delete patient successfully!"}

# @app.get("/getAllData/{idnumber}")
# async def getAllData(idnumber:int):
#     patientdata = patient.find_one({"idnumber":idnumber})
#     if(patientdata is None): raise Exception("Invalid session id")
#     #print(patientdata)
#     patientid = patientdata['idnumber']
#     datainfo = patient.find_one({'idnumber':patientid},{
#         "_id":0,
#         "telephone":0, 
#         "email":0,
#         "input_date":0
#         })
#     #print(datainfo)
#     return datainfo

# @app.post('/addnhomthuthuat')
# async def addnhomthuthuat(thuthuatgroup: noidungthuthuat = Body(...)):
#     newthuthuatgroup = {
#         "ten_nhom_thu_thuat":thuthuatgroup.ten_nhom_thu_thuat,
        
#     }
#     newnhomthuthuat = nhomthuthuat.insert_one(newthuthuatgroup)
#     return {"message": "Thu thuat moi da duoc them vao"}


# @app.post('/addthuthuat')
# async def addthuthuat(id:str,  thuthuatdata : noidungthuthuat = Body(...)):
#     nhomthuthuatid = nhomthuthuat.find_one({"_id":ObjectId(id)})
#     #namenhomthuthuat = nhomthuthuat.find_one({"ten_nhom_thu_thuat": })
#     print(nhomthuthuatid)
#     thuthuatid = nhomthuthuatid['_id']
#     tennhomthuthuat = nhomthuthuatid['ten_nhom_thu_thuat']

#     dulieuthuthuat = {
#         "thuthuatid": thuthuatid,
#         "ten_nhom_thu_thuat": tennhomthuthuat,
#         "ten_thu_thuat": thuthuatdata.ten_thu_thuat,
#         "don_gia": thuthuatdata.don_gia,
#         #"giam_gia": thuthuatdata.giam_gia,
#         #"thanh_tien": thuthuatdata.thanh_tien,
#         #"so_luong": thuthuatdata.so_luong

#     }
#     thuthuatmoi = thuthuat.insert_one(dulieuthuthuat)
    
#     return {"message":"Thu thuat moi da duoc them vao"}



# @app.get("/getallnhomthuthuat")
# async def getallnhomthuthuat():
#     allgroup = list(nhomthuthuat.find({},{
#         "_id": 1,
#         "ten_nhom_thu_thuat": 1
#     }))
#     for group in allgroup:
#         group['_id']  = str(group['_id'])
#     return {"allgroup":allgroup}

# @app.get("/getthuthuat/{nhomthuthuatid}")
# async def getthuthuat(nhomthuthuatid:str):
#     try:
#         nhomthuthuatid_obj = ObjectId(nhomthuthuatid)
#         idthuthuat = nhomthuthuat.find_one({"_id":nhomthuthuatid_obj})
#         if idthuthuat is None:
#             return {"message": "Thu thuat not found"}
#         # print(idthuthuat)
#         tennhom = idthuthuat['ten_nhom_thu_thuat']


#         thuthuatid = idthuthuat['_id']

#         tenthuthuat = thuthuat.find({"thuthuatid": thuthuatid},{
#             "_id":1,
#             "ten_nhom_thu_thuat":1,
#             "ten_thu_thuat":1,
#             "don_gia":1,
#             "giam_gia":1
#         })
#         if tenthuthuat is None:
#             return {"message": "Thu thuat data not found"}
#         if not tenthuthuat:
#             raise HTTPException(status_code=404, detail="Thuthuat data not found")
        
#         tenthuthuat = [doc for doc in tenthuthuat]
#         for ten in tenthuthuat:
#             ten['_id'] = str(ten['_id'])
#         #print(tenthuthuat)
#         return {"thuthuat":tenthuthuat, "tennhom":tennhom}
    

        
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# @app.get("/thuthuatduocluachon/{id}")
# async def thuthuatduocluachon(id:str):
#     try:
#         thuthuatid_obj = ObjectId(id)
#         idthuthuat = thuthuat.find_one({"_id":thuthuatid_obj})
#         if idthuthuat is None:
#             return {"message": "Thu thuat not found"}
#         #print(idthuthuat)
#         thuthuatid = idthuthuat['_id']
#         tenthuthuat = thuthuat.find({"_id": thuthuatid},{
#             "_id":1,
#             "ten_thu_thuat":1,
#             "don_gia":1,
#             "giam_gia":1
#         })
#         if not tenthuthuat:
#             raise HTTPException(status_code=404, detail="Thuthuat data not found")

#         tenthuthuat = [doc for doc in tenthuthuat]
#         for i in tenthuthuat:
#             i['_id'] = str(i['_id'])
#         #print(tenthuthuat)
#         return tenthuthuat

        
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# @app.post("/thuthuatbenhnhan/{idnumber}")
# async def thuthuatbenhnhan( idnumber: int, items:List[ChiTietKhamBenh] = Body(...)):
#     idbenhnhan = patient.find_one({"idnumber":idnumber})
#     if idbenhnhan is None:
#         return {"message": "benh nhan khong tim thay"}
#     newRecords = []
#     for item in items:
#         item.ngaykham = datetime.now().strftime("%d/%m/%Y")
#         item.idnumber = idbenhnhan['idnumber']
#         thuthuatid = item.thuthuatid
#         isExit:dict = chitietkhambenh.find_one({"idnumber": idnumber, "thuthuatid": thuthuatid})
#         if(isExit is None):
#             newRecords.append(item.__dict__)
#         else:
#             chitietkhambenh.update_one({"_id":isExit['_id']}, {"$set":item.__dict__})
#     if(len(newRecords) > 0):
#         # thuthuattungbenhnhan.insert_many(newRecords)
#         chitietkhambenh.insert_many(newRecords)
#     print(newRecords)
#     return {"message": "success"}



# @app.get("/ngaykham/{idnumber}")
# async def ngaykham(idnumber: int):
#     idbenhnhan = patient.find_one({"idnumber": idnumber})
#     if idbenhnhan is None:
#         return {"message": "Benh nhan khong tim thay"}
    
#     id = idbenhnhan['idnumber']
#     thuthuatcanhan = chitietkhambenh.distinct("ngaykham",{"idnumber":id})
#     #print(thuthuatcanhan)
#     thuthuatcanhan_unique = [{"ngaykham":value} for value in thuthuatcanhan]
#     thuthuatcanhan_unique.sort(key=lambda x:datetime.strptime(x['ngaykham'],'%d/%m/%Y'), reverse=True)

#     #print(thuthuatcanhan_unique)
#     return thuthuatcanhan_unique


# @app.post("/filtertheongay/")
# async def filtertheongay(info :dict = Body(...)):
# # input: {
# #     "filter_type": "and",
# #     "condition": {
# #         "idnumber": {
# #             "logic": "=",
# #             "value": 611488
# #         },
# #         "ngaykham": {
# #             "logic": "=",
# #             "value": "22/12/2023"
# #         },
# #         "ngayke": {
# #               "logic":"=",           
# #               "value":"22/12/2023"
# #    }
# #     }
# # }
# # return {
# #     datathuthuat: [],
# #     datadonthuoc: [],
# # }

#     filtercondition = {}
#     datathuthuat = []
#     datadonthuoc = []
#     if info.get("filter_type","and") == "and":
#         for col in info['condition']:
#             if (info['condition'][col]['logic'] == "="):
#                 if col == "idnumber":
#                     filtercondition[col] = int(info["condition"][col]['value'])
#                 elif col == "ngaykham":
#                     filtercondition[col] = info['condition'][col]['value']
#                 elif col == "ngayke" :
#                     filtercondition[col] = info['condition'][col]['value']

                        
#     # print(filtercondition)
#     # if "ngaykham" in filtercondition:
#     ngaykham_value = filtercondition["ngaykham"]
#     idnumber_value = filtercondition['idnumber']
#     datathuthuat = list(chitietkhambenh.find({"ngaykham":ngaykham_value,"idnumber":idnumber_value},{
#         "thuthuatid":0
#     }))
#     # print(datathuthuat)
#     # elif "ngayke" in filtercondition:
#     ngayke_value = filtercondition['ngayke']
#     datadonthuoc = list(donthuoctungbenhnhan.find({"ngayke":ngayke_value,"idnumber":idnumber_value},{
#         "donthuoc_id":0,
#         "nguoike":0
#     }))
#     # print(datadonthuoc)

#     for item in datathuthuat:
#         item["_id"] = str(item["_id"])
#     for item2 in datadonthuoc:
#         item2["_id"] = str(item2["_id"])
#     return {"datathuthuat":datathuthuat,"datadonthuoc":datadonthuoc}
 

# @app.delete('/xoanhomthuthuat')
# async def xoanhomthuthuat(id:str):
#     nhom = nhomthuthuat.find_one({"_id": ObjectId(id)})
#     if nhom is None:
#         return {"message": "Khong tim thay nhom thu thuat"}
#     #print(nhom)
#     nhomcanxoa = nhom['_id']
#     #print(nhomcanxoa)
    
#     nhomthuthuat.delete_one({"_id":nhomcanxoa})
#     thuthuat.delete_many({"thuthuatid":nhomcanxoa})
    
#     return {"message": "Xoa nhom thu thuat thanh cong"}

# @app.delete('/xoathuthuat')
# async def xoathuthuat(id:str):
#     tt  = thuthuat.find_one({"_id":ObjectId(id)})
#     if tt is None:
#         return {"message": "Khong tim thay thu thuat"}
#     ttcanxoa = tt['_id']
#     thuthuat.delete_one({"_id":ttcanxoa})
#     return {"message": "Xoa thu thuat thanh cong"}

# @app.post('/donthuoc')
# async def donthuocmoi(dt_list :List[danhsachdonthuoc] = Body(...)):
#     new_donthuoc_list = []
#     for dt in dt_list:
#         newdonthuoc = {
#             "ten_thuoc": dt.donthuoc,
#             "don_vi": dt.donvi
#         }
#         new_donthuoc_list.append(newdonthuoc)

#     dtn = donthuoc.insert_many(new_donthuoc_list)
#     return {"message":"don thuoc moi da duoc them vao"}

# @app.post('/motdonthuoc')
# async def motdonthuoc(dt: danhsachdonthuoc = Body(...)):
#     donthuoconly = {
#         "ten_thuoc":dt.donthuoc,
#         "don_vi":dt.donvi
#     }
#     donthuoc.insert_one(donthuoconly)
#     return {"message":"don thuoc moi da duoc them vao"}

# @app.get('/danhsachtoanbodonthuoc')
# async def danhsachdonthuocdata():
#     danhsach = list(donthuoc.find({},{
#         "_id":1,
#         "donthuoc":1,
#         "donvi":1
#     }))
#     for id in danhsach:
#         id["_id"] = str(id["_id"])
#     return danhsach

# @app.delete('/xoadonthuoc')
# async def xoanhomthuthuat(id:str):
#     nhom = donthuoc.find_one({"_id": ObjectId(id)})
#     if nhom is None:
#         return {"message": "Khong tim thay nhom thu thuat"}
#     nhomcanxoa = nhom['_id']
#     donthuoc.delete_one({"_id":nhomcanxoa})
#     return {"message": "Xoa don thuoc thanh cong"}

# @app.get('/donthuocduocchon/{id}')
# async def donthuocduocchon(id:str):
#     donthuocid = donthuoc.find_one({"_id": ObjectId(id)})
#     if donthuocid is None:
#         return {"message": "Khong tim thay don thuoc"}
#     iddonthuoc = donthuocid['_id']
#     thongtin = donthuoc.find({"_id":iddonthuoc},{
#         "_id":1,
#         "don_vi":0
#     })
#     thongtinthuoc = [doc for doc in thongtin]
#     for i in thongtinthuoc:
#         i['_id'] = str(i['_id'])
#     return thongtinthuoc



#Lưu lại đơn thuốc của bệnh nhân theo ngày và người kê thuốc
# @app.post("/donthuocbenhnhan/{idnumber}")
# async def donthuocbenhnhan(idnumber: int, items: List[danhsachdonthuoc]  = Body(...)):
#     idbenhnhan = patient.find_one({"idnumber":idnumber})
#     if idbenhnhan is None:
#         return {"message": "Khong tim thay benh nhan"}
#     newRecords = []
#     day = datetime.now()
#     for item in items:
#         # medicinedate = datetime.strptime(item.ngayke, "%d/%m/%Y")
#         # item.ngayke = medicinedate.strftime("%d/%m/%Y")
#         item.ngayke = day.strftime("%d/%m/%Y")
#         item.idnumber = idbenhnhan['idnumber']
#         donthuocid = item.donthuoc_id
#         if item.nguoike == PersonEnum.bsLan:
#             nguoike_str = "BS Lan"
#         elif item.nguoike == PersonEnum.bsMy:
#             nguoike_str = "BS Mỹ"
#         isExit: dict = donthuoctungbenhnhan.find_one({"idnumber":idnumber,"donthuocid":donthuocid})
#         if (isExit is None):
#             newRecords.append(item.__dict__)
#         else:
#             donthuoctungbenhnhan.update_one({"_id":isExit['_id']}, {"$set":item.__dict__})
#     #print(newRecords)
#     if(len(newRecords) > 0):
#         donthuoctungbenhnhan.insert_many(newRecords)
#     # print(newRecords)
#     return {"message": "Success"}


# def remind(tenbenhnhan):
#     print(f"Sắp đến lịch hẹn bệnh nhân {tenbenhnhan}")

# @app.post("/set_lich_hen")
# async def setlichhen(item: lichhenchobenhnhan = Body(...)):
#     benhnhan = patient.find_one({"idnumber":item.idnumber})
#     if benhnhan is None:
#         return {"message": "Khong tim thay benh nhan"}
#     idbenhnhan = benhnhan['idnumber']
#     item.tenbenhnhan = benhnhan['name']
#     appointment_date = datetime.strptime(item.lich_hen, "%d/%m/%Y %H:%M")
#     if idbenhnhan:
#         formatted_date = appointment_date.strftime("%d/%m/%Y %H:%M")
#         reminder_time = appointment_date - timedelta(days=1)  # Trừ 1 ngày từ đối tượng datetime
#         formatted_reminder_time = reminder_time.strftime("%d/%m/%Y %H:%M")
#         item.reminder_time = formatted_reminder_time
#         print(formatted_date)
#         print(formatted_reminder_time)
#         lichhen.insert_one(item.__dict__)


#     return {"Benh nhan": item.tenbenhnhan, "Lich hen": item.lich_hen}

    


# @app.post("/sendNotification")
# async def setNotification(item: PatientNotification = Body(...)):
#     #tìm bệnh nhân
#     benhnhan = patient.find_one({"idnumber": item.idnumber})
#     if benhnhan is None:
#         return {"message": "Khong tim thay benh nhan"}
    
#     idbenhnhan = benhnhan['idnumber']
#     item.tenbenhnhan = benhnhan['name']
#     now = datetime.now()
#     if idbenhnhan:
#         notification_time = now.strftime("%d/%m/%Y %H:%M:%S")
#         item.sendtime = notification_time
#         item.read = False
#         notification.insert_one(item.__dict__)
        
#     return {"Benh nhan": item.tenbenhnhan, "Thoi gian thong bao": item.sendtime}

# @app.post("/count_unread_noti")
# async def count_unread_noti():
#     unread_count = notification.count_documents({"read": False})
#     return unread_count

# @app.post("/mark_noti_as_read")
# async def mark_noti_as_read(noti_id:str):
#     notiid = ObjectId(noti_id)
#     result = notification.update_one({"_id":notiid}, {"$set": {"read": True}})
#     return {"message": "success"}



#Tạo API để lấy toàn bộ thông báo 
# @app.get("/getNotification")
# async def getNotification():
#     thongbao = list(notification.find({},{
#         "_id":1,
#         "sendtime":1,
#         "tenbenhnhan":1,
#         "read":1,
#         "notificationType":1
#     }))
#     for send in thongbao:
#         send['sendtime'] = datetime.strptime(send['sendtime'], '%d/%m/%Y %H:%M:%S')
#         #print(send)

#     thongbao.sort(key=lambda x: x['sendtime'], reverse=True)

#     for item in thongbao:
#         item['sendtime'] = str(item['sendtime'])
#         item['_id'] = str(item['_id'])

#     return thongbao


#Phương án: tạo một basemodel chung và thêm trường notification type
# -arrive: thông báo dạng bệnh nhân đang đến
# -reminder: thông báo dạng lịch hẹn
#các trường: 
# {
# "idnumber": 882447,
# "tenbenhnhan": "string",
# "notificationType":{
#   "arrive":{
#       "sendtime":"string"
#   }
# },
# "read":"False"
# }


# @app.post('/thongbaotheoloai')
# async def thongbaotheoloai(item: dict = Body(...)):
#     thongtinbenhnhan = patient.find_one({"idnumber": item['idnumber']})
#     if thongtinbenhnhan is None:
#         return {"message":"Khong tim thay benh nhan"}
#     now = datetime.now()
#     noticondition = {
#     'idnumber': thongtinbenhnhan['idnumber'],
#     'tenbenhnhan': thongtinbenhnhan['name'],
#     'read': False
# }
#     if item['idnumber']:
#         for col in item['notificationType']:
#             if col == 'arrive':
#                 item["notificationType"][col]['sendtime'] = now.strftime("%d/%m/%Y %H:%M:%S")
#                 noticondition["notificationType"] = col
#                 noticondition["sendtime"] = item["notificationType"][col]['sendtime']
#                 notification.insert_one(noticondition)
#     print(noticondition)
#     return {"message":"success"}


# @app.post('/thongbaolichhen')
# async def thongbaolichhen(item: dict = Body(...)):
# {
# "idnumber": 882447,
# "tenbenhnhan": "string",
# "notificationType":{
#   "reminder":{
#       "sendtime":"01/01/2024 01:01:01"
#   }
# },
# "note": "string",
# "before_reminder": 4,
# "read":"False"
# }
#     thongtinbenhnhan = patient.find_one({"idnumber": item['idnumber']})
#     if thongtinbenhnhan is None:
#         return {"message":"Khong tim thay benh nhan"}
#     noticondition = {
#     'idnumber': thongtinbenhnhan['idnumber'],
#     'tenbenhnhan': thongtinbenhnhan['name'],
#     'note':item['note'],
#     'read': False
# }
#     if item['idnumber']:
#         for col in item['notificationType']:
#             if col == 'reminder':
#                 appointment_date = datetime.strptime(item["notificationType"][col]['sendtime'],"%d/%m/%Y %H:%M:%S")
#                 formatted_date = appointment_date.strftime("%d/%m/%Y %H:%M:%S")
#                 #reminder_time: lời nhắc trước lịch hẹn một ngày
#                 reminder_time = appointment_date - timedelta(days=item['before_reminder'])
#                 formatted_reminder_time = reminder_time.strftime("%d/%m/%Y %H:%M:%S")
#                 noticondition['reminder_time'] = formatted_reminder_time
#                 item['notificationType'][col]['sendtime'] = formatted_date
#                 noticondition["notificationType"] = col
#                 noticondition["sendtime"] = item['notificationType'][col]['sendtime']
#                 lichhen.insert_one(noticondition)
#     print(noticondition)
#     return {"message":"success", "reminder_time": noticondition['reminder_time']}

#Thêm chức năng xóa các thông báo không cần thiết
# @app.post('/deleteNotification')
# async def deleteNotification():
#     notification.delete_many({"read":True})
#     return {"message": "success"}

# @app.get('/danhsachlichhen')
# async def danhsachlichhen():
#     items = list(lichhen.find({},{
#         "_id":1,
#         "tenbenhnhan":1,
#         "read":1,
#         "reminder_time":1,
#         "notificationType":1,
#         "sendtime":1
#     }))
#     for item in items:
#         item['_id'] = str(item['_id'])

#     return items

# @app.post("/count_unread_reminder")
# async def count_unread_reminder():
#     unread_count = lichhen.count_documents({"read": False})
#     return unread_count

# @app.post("/mark_reminder_as_read")
# async def mark_reminder_as_read(noti_id:str):
#     notiid = ObjectId(noti_id)
#     result = lichhen.update_one({"_id":notiid}, {"$set": {"read": True}})
#     return {"message": "success"}

# @app.post('/delete_reminder')
# async def delete_reminder():
#     lichhen.delete_many({"read":True})
#     return {"message": "success"}

# @app.post('/lichhentheongay')
# async def lichhentheongay(item: dict = Body(...)):
#Lấy lịch hẹn theo ngày0
# JSON:
# {
# "condition":{
#   "sendtime":{
#       "logic": "=",
#       "value": "01/01/2024"
# }
# }
#Logic:
# collection bao gồm tập hợp các dữ liệu có định dạng %d/%m/%Y %H:%M:%S
# input: dữ liệu có dạng %d/%m/%Y, lấy từ file JSON ở trên
# output: tập hợp các dữ liệu có ngày tháng năm trong collection trùng với input

    # filtercondition = {}
    # for col in item['condition']:
    #     if (item['condition'][col]['logic'] == '='):
    #         dt = datetime.strptime(item["condition"][col]['value'],"%d/%m/%Y").date()
    #         print(dt)
    #         data = list(lichhen.find({
    #             "sendtime": {
    #                 "$gte": dt.strftime("%d/%m/%Y 00:00:00"),
    #                 "$lte": dt.strftime("%d/%m/%Y 23:59:59")
    #             },
                
    #         }))
    #         for i in data:
    #             i['_id'] = str(i['_id'] )
    #         # print(data)
    # return data

    

    
    
    
