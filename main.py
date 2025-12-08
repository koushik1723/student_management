from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from sqlalchemy.orm import Session

from database import SessionLocal, engine, Base
from models import Student as StudentModel, Marks as MarksModel
from schemas import StudentCreate, StudentOut

Base.metadata.create_all(bind=engine)

app = FastAPI()

# ================= CORS ====================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],     # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# DB Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ================= ADD STUDENT ====================
@app.post("/students/", response_model=StudentOut)
def create_student(student: StudentCreate, db: Session = Depends(get_db)):

    new_student = StudentModel(
        name=student.name,
        age=student.age,
        email=student.email,
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    for m in student.marks:
        mark_row = MarksModel(
            subject=m.subject,
            marks=m.marks,
            student_id=new_student.id,
        )
        db.add(mark_row)

    db.commit()
    db.refresh(new_student)
    return new_student


# ================= GET ALL STUDENTS ====================
@app.get("/students/", response_model=List[StudentOut])
def get_students(db: Session = Depends(get_db)):
    return db.query(StudentModel).all()


# ================= GET Student by ID ====================
@app.get("/students/{student_id}", response_model=StudentOut)
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(StudentModel).filter(StudentModel.id == student_id).first()
    if not student:
        raise HTTPException(404, "Student not found")
    return student
