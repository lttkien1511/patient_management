from fastapi import APIRouter
from Model.Nhomthuthuat import Nhomthuthuat
from Model.patientInfo import ChiTietKhamBenh
from Model.Mongo import Mongo
from fastapi import Body
from datetime import datetime, date, timedelta
from time import time
from Helper.Reply import Reply
from Helper.Default import *
from bson import ObjectId


router = APIRouter()
collection1 = 'thu_thuat'
collection2 = 'nhom_thu_thuat'
model1 = Mongo(collection=collection1)
model2 = Mongo(collection=collection2)

@router.post("/test")
async def test():
    return makeId()

@router.post("/add")
async def add (id:str, data: Nhomthuthuat = Body(...)):
    try:
        id = model2.collection.find_one({"_id":ObjectId(id)})
        print(id)
        insertData = data.__dict__
        insertData['create_time'] = time()
        insertData['nhomthuthuatid']  = str(id['_id'])
        insertData['procedureGroup'] = str(id["procedureGroup"])
        newGroup = model1.collection.insert_one(insertData)
        inserted_id = newGroup.inserted_id
        new_record = model1.collection.find_one({"_id": inserted_id},{'_id':0})
        return Reply.make(True, 'Success', new_record)
    except Exception as e:
        return Reply.make(False, str(e))


@router.get('/getall')
async def getall(id:str):
    id = model2.collection.find_one({"_id":ObjectId(id)})
    print(id)
    record= id['procedureGroup']
    data = list(model1.collection.find({"procedureGroup":record},{
        "_id":1,
        "procedureGroup":1,
        "procedure":1,
        "don_gia":1,
        # "giam_gia":1
    }))
    for i in data:
        i['_id'] = str(i['_id'])
    return Reply.make(True, 'Success', [data, record])
    # return {'data':data, 'record':record}
    
@router.delete("/delete")
async def deletedata(id: str):
    group = model1.collection.delete_one({"_id": ObjectId(id)})
    return Reply.make(True, 'Success')


@router.get("/chosenData")
async def chosenData(id:str):
    try:
        data = list(model1.collection.find({"_id":ObjectId(id)},{
            "id":1,
            "ten_thu_thuat":1,
            "don_gia":1,
            "giam_gia":1
        }))
        data = [doc for doc in data]
        for i in data:
            i["_id"] = str(i["_id"])
        return Reply.make(True, 'Success', data)
    except Exception as e:
        return Reply.make(False, str(e))



