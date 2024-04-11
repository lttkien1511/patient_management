from fastapi import APIRouter
from Helper.Reply import Reply
from Helper.Default import *
from Model.Mongo import Mongo
from Model.patientInfo import ChiTietKhamBenh
from fastapi import Body
from time import time
from typing import List
from bson import ObjectId
from datetime import datetime



router = APIRouter()
collection1 = 'chi_tiet_kham_benh'
collection2 = 'don_thuoc_tung_benh_nhan'
collection3 = 'benh_nhan'
collection4 = 'thu_thuat'
model1 = Mongo(collection=collection1)
model2 = Mongo(collection=collection2)
model3 = Mongo(collection=collection3)
model4 = Mongo(collection=collection4)

@router.post("/filter")
async def filter(info :dict = Body(...)):
# input: {
#     "filter_type": "and",
#     "condition": {
#         "idnumber": {
#             "logic": "=",
#             "value": "614129d2-7622-4a48-9268-7c9d210cc785"
#         },
#         "ngaykham": {
#             "logic": "=",
#             "value": 1712201562.0201426
#         },
#         "ngayke": {
#               "logic":"=",           
#               "value":1712201562.0201426
#    }
#     }
# }
# return {
#     datathuthuat: [],
#     datadonthuoc: [],
# }

    filtercondition = {}
    datathuthuat = []
    datadonthuoc = []
    if info.get("filter_type","and") == "and":
        for col in info['condition']:
            if (info['condition'][col]['logic'] == "="):
                if col == "idnumber":
                    filtercondition[col] = str(info["condition"][col]['value'])
                elif col == "ngaykham":
                    filtercondition[col] = str(info['condition'][col]['value'])
                elif col == "ngayke" :
                    filtercondition[col] = str(info['condition'][col]['value'])

    ngaykham_value = filtercondition["ngaykham"]
    idnumber_value = filtercondition['idnumber']
    datathuthuat = list(model1.collection.find({"create_time":ngaykham_value,"idnumber":idnumber_value},{
        "thuthuatid":0
    }))

    ngayke_value = filtercondition['ngayke']
    datadonthuoc = list(model2.collection.find({"create_time":ngayke_value,"idnumber":idnumber_value},{
        "donthuoc_id":0,
        "nguoike":0
    }))
    for item in datathuthuat:
        item["_id"] = str(item["_id"])
    for item2 in datadonthuoc:
        item2["_id"] = str(item2["_id"])
    # return {"datathuthuat":datathuthuat,"datadonthuoc":datadonthuoc}
    return Reply.make(True, 'Success', [datathuthuat, datadonthuoc])



@router.get("/ngaykham")
async def ngaykham(idnumber: str):
    idbenhnhan = model3.collection.find_one({"idnumber": idnumber})
    id = idbenhnhan['idnumber']
    thuthuatcanhan = model1.collection.distinct("create_time",{"idnumber":id})
    thuthuatcanhan_unique=sorted(thuthuatcanhan, reverse=True)
    return Reply.make(True, 'Success', thuthuatcanhan_unique)

@router.post("/insertData")
async def insertData(idnumber:str, data : List[ChiTietKhamBenh] = Body(...)):
    try:
        id = model3.collection.find_one({"idnumber":idnumber})
        records = []
        for item in data:
            insertData = item.__dict__
            thuthuatid = model4.collection.find_one({"_id":ObjectId(item.thuthuatid)})
            insertData['create_time'] = datetime.now().strftime("%d/%m/%Y")
            insertData['idnumber']= str(id['idnumber'])
            insertData['procedure'] = thuthuatid['procedure']
            records.append(insertData)
        newinfo = model1.collection.insert_many(records)
        inserted_ids = newinfo.inserted_ids
        new_record = model1.collection.find({"_id": {"$in":inserted_ids}},{'_id':0})
        return Reply.make(True, 'Success', list(new_record))
    except Exception as e:
        return Reply.make(False, str(e))