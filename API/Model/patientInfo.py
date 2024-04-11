from pydantic import BaseModel
from enum import Enum
from typing import List

class patientInfo(BaseModel):
    name: str | None = None
    age: str | None = None
    gender:str | None = None
    telephone: str | None = None
    address:str | None = None
    reason: str | None = None
    email: str | None = None
    birthday: str | None = None
    #inputdate: date = date.today()
    inputdate: str | None = None
    medical_history: List[str] | None = None
    idnumber: int = None 

class ChiTietKhamBenh(BaseModel):
    idnumber: int | None = None
    thuthuatid: str | None = None
    tooth_number: str | None = None
    procedure: str | None = None
    noi_dung_thu_thuat: str | None = None
    so_luong: int | None = None
    don_gia: int | None = None
    thanh_tien: int | None = None
    percent: int | None = None
    giam_gia: int | None = None
    lydogiam: str | None = None
    ngaykham: str | None = None