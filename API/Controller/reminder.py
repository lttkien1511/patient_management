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
collection1 = 'lich_hen_tung_benh_nhan'
collection2 = 'benh_nhan'
model1 = Mongo(collection=collection1)
model2 = Mongo(collection=collection2)

@router.post("/count_unread_reminder")
async def count_unread_reminder():
    unread_count = model1.collection.count_documents({"read": False})
    return Reply.make(True, 'Success', unread_count)        

@router.post("/mark_reminder_as_read")
async def mark_reminder_as_read(noti_id:str):
    notiid = ObjectId(noti_id)
    result = model1.collection.update_one({"_id":notiid}, {"$set": {"read": True}})
    return Reply.make(True, 'Success', result)        

@router.post('/delete_reminder')
async def delete_reminder():
    model1.collection.delete_many({"read":True})
    return Reply.make(True, 'Success')        

@router.post('/reminder_list')
async def lichhentheongay(item: dict = Body(...)):
#Lấy lịch hẹn theo ngày0
# JSON:
# {
# "condition":{
#       "value": "01/01/2024"
# }
# }
    try:
        appointment_time = datetime.strptime(item['condition']['value'], "%d/%m/%Y")
        data = list(model1.collection.find({
            "appointment_date": {
                "$gte": appointment_time.strftime("%d/%m/%Y 00:00:00"),
                "$lte": appointment_time.strftime("%d/%m/%Y 23:59:59")
            }
        }))
        for i in data:
            i['_id'] = str(i['_id'] )
        return Reply.make(True, 'Success', data)
    except Exception as e:
        return Reply.make(False, str(e))

         

@router.post('/add')
async def thongbaolichhen(id: str, item: PatientNotification = Body(...)):
    try:
        id = model2.collection.find_one({"idnumber":id})
        insertData = item.__dict__
        insertData['idnumber'] = id['idnumber']
        insertData['name'] = id['name']
        appointment_date = datetime.strptime(item.appointment_date, "%d/%m/%Y %H:%M:%S")


        insertData['reminder_time'] = appointment_date - timedelta(days=item.before_reminder)
        insertData['notificationType'] = 'reminder'
        insertData['read'] = False

        newData = model1.collection.insert_one(insertData)
        inserted_id = newData.inserted_id
        new_record = model1.collection.find_one({"_id": inserted_id}, {"_id":0})
        return Reply.make(True, 'Success', new_record)
        
    except Exception as e:
        return Reply.make(False, str(e))


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
    

#     thongtinbenhnhan = model2.collection.find_one({"idnumber": item['idnumber']})
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
#                 model1.collection.insert_one(noticondition)
#     print(noticondition)
#     # return {"message":"success", "reminder_time": noticondition['reminder_time']}
#     return Reply.make(True, 'Success', noticondition)