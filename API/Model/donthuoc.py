from pydantic import BaseModel
from enum import Enum
from typing import List

class danhsachdonthuoc(BaseModel):
    idnumber: int | None = None
    donthuoc_id: str | None = None
    donthuoc: str | None = None
    donvi: str | None = None
    soluong: int | None = None
    huongdan: str | None = None
    ngayke: str | None = None
    nguoike: str | None = None