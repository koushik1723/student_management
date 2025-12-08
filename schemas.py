from typing import List, Optional
from pydantic import BaseModel


class MarksBase(BaseModel):
    subject: str
    marks: int


class StudentBase(BaseModel):
    name: str
    age: int
    email: str


class StudentCreate(StudentBase):
    marks: List[MarksBase]


class StudentUpdate(BaseModel):
    name: Optional[str]
    age: Optional[int]
    email: Optional[str]


class MarksOut(MarksBase):
    id: int
    student_id: int

    class Config:
        from_attributes = True


class StudentOut(StudentBase):
    id: int
    marks: List[MarksOut]

    class Config:
        from_attributes = True
