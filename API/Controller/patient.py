from fastapi import APIRouter
from Model.patientInfo import patientInfo, ChiTietKhamBenh
from Model.Mongo import Mongo
from fastapi import Body
# from datetime import datetime, date, timedelta
from time import time
from Helper.Reply import Reply
from Helper.Default import *
# from bson import ObjectId

router = APIRouter()
collection = 'benh_nhan'
model = Mongo(collection=collection)

@router.post("/test")
async def test():
    return makeId()

@router.post("/add")
async def add ( data: patientInfo = Body(...)):
    try:
        insertData = data.__dict__
        insertData['create_time'] = time()
        insertData['idnumber'] = str(makeId())
        newpatient = model.collection.insert_one(insertData)
        inserted_id = newpatient.inserted_id
        new_record = model.collection.find_one({"_id": inserted_id},{'_id':0})
        return Reply.make(True, 'Success', new_record)
    except Exception as e:
        return Reply.make(False, str(e))

@router.post("/filter/")
async def filter_data(data: dict = Body(...)):
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

    page = data.get('page',1)
    limit = data.get('limit',10)
    skip = (page-1)*limit

    filtercondition = {}
    
    if data.get("filter_type", "and") == "and":
        for col in data['condition']:
            if(data['condition'][col]['logic'] == "="):
                filtercondition[col] = data["condition"][col]['value']
            elif(data["condition"][col]['logic'] == "like"):
                #filtercondition[col] = {"$regex": data["condition"][col]['value']}
                filtercondition[col] = {"$regex": data["condition"][col]['value'],"$options":"i"}
    
    total = model.collection.count_documents(filtercondition)
    patientdata = model.collection.find(filtercondition).skip(skip).limit(limit)
    sortField = data.get('sort_field', None)
    sortDirect = int(data.get('sort_direct',1))
    if (sortField is not None):
        patientdata.sort([(sortField, sortDirect)])

    patientdata = list(patientdata)
    #print(patientdata)
    for item in patientdata:
        item['_id'] = str(item['_id'])
    return {
        "data" : patientdata,
        "total": total,
        "page": page
    }

@router.get('/getall')
async def getall(page: int = 1, limit: int = 10):
    skip = (page-1) * limit
    data = list(model.collection.find({},{
        "idnumber":1,
        "name":1,
        "age":1,
        "gender":1,
        "telephone":1,
        "address":1,
        "reason":1,
        "create_time":1
    }).skip(skip).limit(limit))
    for i in data:
        i['_id'] = str(i['_id'])

    return Reply.make(True, 'Success', data)
   

@router.patch("/update")
async def updatedata(idnumber: int, data: patientInfo = Body(...)):
    update_fields = {key: value for key, value in data.__dict__.items() if key!= "idnumber" and value is not None}
    try:
        result = model.collection.update_one(
            {"idnumber": idnumber},
            {"$set": 
                update_fields
            }
        )
        if result.modified_count > 0:
            return Reply.make(True, 'Success', result.__dict__)
    except Exception as e:
        return Reply.make(False, str(e))
    
@router.delete("/delete")
async def deletedata(idnumber: str):
    model.collection.delete_one({"idnumber":idnumber})
    return Reply.make(True, 'Success')

@router.get("/getDetailData")
async def getDetailData(idnumber:str):
    # data = model.collection.find_one({"_id":ObjectId})
    # if(data is None): raise Exception("Invalid session id")
    # patientid = data['idnumber']
    data = list(model.collection.find({'idnumber':idnumber},{
            "name":1,
            "_id":1,
            "idnumber":1,
            "age":1,
            "gender":1,
            "address":1,
            "reason":1,
            "birthday":1,
            "medical_history":1
        }))
    for i in data:
        i['_id'] = str(i["_id"])
    return Reply.make(True, 'Success', data)

