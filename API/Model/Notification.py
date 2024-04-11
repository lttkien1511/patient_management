from pydantic import BaseModel


class PatientNotification(BaseModel):
    sendtime: str | None = None
    idnumber: str | None = None
    name: str | None = None
    read: bool | None = None
    notificationType: str | None = None
    note: str | None = None
    appointment_date: str | None = None
    before_reminder: int | None = None