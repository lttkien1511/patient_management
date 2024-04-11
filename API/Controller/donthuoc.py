from fastapi import APIRouter
from Model.donthuoc import danhsachdonthuoc
from Model.Mongo import Mongo
from fastapi import Body
from time import time
from Helper.Reply import Reply
from Helper.Default import *
from bson import ObjectId
from typing import List


router = APIRouter()
collection1 = 'don_thuoc'
collection2 = 'benh_nhan'
collection3 = 'don_thuoc_tung_benh_nhan'
model1 = Mongo(collection=collection1)
model2 = Mongo(collection=collection2)
model3 = Mongo(collection=collection3)

@router.post("/test")
async def test():
    return makeId()

@router.post("/add")
async def add ( data: danhsachdonthuoc = Body(...)):
    try:
        insertData = data.__dict__
        insertData['create_time'] = time()
        newGroup = model1.collection.insert_one(insertData)
        inserted_id = newGroup.inserted_id
        new_record = model1.collection.find_one({"_id": inserted_id},{'_id':0})
        return Reply.make(True, 'Success', new_record)
    except Exception as e:
        return Reply.make(False, str(e))


@router.get('/getall')
async def getall():
    data = list(model1.collection.find({},{
        "_id":1,
        "donthuoc":1,
        "donvi":1
    }))
    for i in data:
        i['_id'] = str(i['_id'])

    return Reply.make(True, 'Success', data)
   

    
@router.delete("/delete")
async def deletedata(id: str):
    try:
        group = model1.collection.delete_one({"_id": ObjectId(id)})
        return Reply.make(True, 'Success', group.__dict__)
    except Exception as e:
        return Reply.make(False, str(e))
    
@router.post("/insertData")
async def donthuocbenhnhan(idnumber: str, data: List[danhsachdonthuoc] = Body(...)):
    try:
        id = model2.collection.find_one({"idnumber":idnumber})
        records = []
        for item in data:
            insertData = item.__dict__
            insertData['create_time'] = time()
            insertData['idnumber']= str(id['idnumber'])
            records.append(insertData)
        newinfo = model3.collection.insert_many(records)
        inserted_ids = newinfo.inserted_ids
        new_record = model3.collection.find({"_id": {"$in":inserted_ids}},{'_id':0})
        return Reply.make(True, 'Success', list(new_record))
    except Exception as e:
        return Reply.make(False, str(e))
   
    