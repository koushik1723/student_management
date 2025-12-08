from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)

    marks = relationship("Marks", back_populates="student", cascade="all, delete")


class Marks(Base):
    __tablename__ = "marks"

    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String, nullable=False)
    marks = Column(Integer, nullable=False)
    student_id = Column(Integer, ForeignKey("students.id"))

    student = relationship("Student", back_populates="marks")
