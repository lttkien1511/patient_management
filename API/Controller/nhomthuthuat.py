from fastapi import APIRouter
from Model.Nhomthuthuat import Nhomthuthuat
from Model.Mongo import Mongo
from fastapi import Body
# from datetime import datetime, date, timedelta
from time import time
from Helper.Reply import Reply
from Helper.Default import *
from bson import ObjectId


router = APIRouter()
collection = 'nhom_thu_thuat'
model = Mongo(collection=collection)

@router.post("/test")
async def test():
    return makeId()

@router.post("/add")
async def add ( data: Nhomthuthuat = Body(...)):
    try:
        insertData = data.__dict__
        insertData['create_time'] = time()
        newGroup = model.collection.insert_one(insertData)
        inserted_id = newGroup.inserted_id
        new_record = model.collection.find_one({"_id": inserted_id},{'_id':0})
        return Reply.make(True, 'Success', new_record)
    except Exception as e:
        return Reply.make(False, str(e))



@router.get('/getall')
async def getall():
    data = list(model.collection.find({},{
        "_id":1,
        "procedureGroup":1
    }))
    for i in data:
        i['_id'] = str(i['_id'])

    return Reply.make(True, 'Success', data)

    
@router.delete("/delete")
async def deletedata(id: str):
    try:
        group = model.collection.delete_one({"_id": ObjectId(id)})
        return Reply.make(True, 'Success')
    except Exception as e:
        return Reply.make(False, str(e))
