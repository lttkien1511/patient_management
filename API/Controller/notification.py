from fastapi import APIRouter
from Model.Notification import PatientNotification
from Model.Mongo import Mongo
from fastapi import Body
from datetime import datetime, date, timedelta
from time import time
from Helper.Reply import Reply
from Helper.Default import *
from bson import ObjectId

router = APIRouter()
collection1 = 'thong_bao'
collection2 = 'benh_nhan'
model1 = Mongo(collection=collection1)
model2 = Mongo(collection=collection2)

@router.post("/sendNotification")
async def setNotification(item: PatientNotification = Body(...)):
    benhnhan = model2.collection.find_one({"idnumber": item.idnumber})
    idbenhnhan = benhnhan['idnumber']
    item.tenbenhnhan = benhnhan['name']
    if idbenhnhan:
        item.sendtime = time()
        item.read = False
        model1.collection.insert_one(item.__dict__)
    return Reply.make(True, 'Success', f'{item.tenbenhnhan},{item.sendtime}')        

@router.post("/count_unread_noti")
async def count_unread_noti():
    unread_count = model1.collection.count_documents({"read": False})
    return Reply.make(True, 'Success', unread_count)        

@router.post("/mark_noti_as_read")
async def mark_noti_as_read(noti_id:str):
    notiid = ObjectId(noti_id)
    result = model1.collection.update_one({"_id":notiid}, {"$set": {"read": True}})
    return Reply.make(True, 'Success', result)        

@router.get("/getNotification")
async def getNotification():
    thongbao = list(model1.collection.find({},{
        "_id":1,
        "sendtime":1,
        "tenbenhnhan":1,
        "read":1,
        "notificationType":1
    }))
    for send in thongbao:
        send['sendtime'] = datetime.strptime(send['sendtime'], '%d/%m/%Y %H:%M:%S')
    thongbao.sort(key=lambda x: x['sendtime'], reverse=True)

    for item in thongbao:
        item['sendtime'] = str(item['sendtime'])
        item['_id'] = str(item['_id'])
    return Reply.make(True, 'Success', thongbao)  


@router.post('/deleteNotification')
async def deleteNotification():
    model1.collection.delete_many({"read":True})
    return Reply.make(True, 'Success')  

@router.get('/allData')
async def danhsachlichhen():
    items = list(model1.collection.find({},{
        "_id":1,
        "tenbenhnhan":1,
        "read":1,
        "reminder_time":1,
        "notificationType":1,
        "sendtime":1
    }))
    for item in items:
        item['_id'] = str(item['_id'])
    return Reply.make(True, 'Success', items)  