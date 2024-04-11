from pydantic import BaseModel


class Nhomthuthuat(BaseModel):
    procedureGroup: str | None = None
    procedure:str | None = None
    don_gia:int | None = None
