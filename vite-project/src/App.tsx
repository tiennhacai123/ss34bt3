import React, { useState, useEffect } from 'react';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';
import Pagination from './components/Pagination';
import './components/style.css';

interface Student {
  id: string;
  name: string;
  dob: string;
  email: string;
  status: 'active' | 'inactive';
}

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(() => {
    const storedStudents = localStorage.getItem('students');
    return storedStudents ? JSON.parse(storedStudents) : [];
  });

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleAddStudent = (student: Student) => {
    setStudents(prevStudents => [...prevStudents, student]);
  };

  const handleUpdateStudentStatus = (id: string, status: 'active' | 'inactive') => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === id ? { ...student, status } : student
      )
    );
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  return (
    <div className="app-container">
      <AddStudent onAddStudent={handleAddStudent} />
      <StudentList
        students={students}
        onUpdateStudentStatus={handleUpdateStudentStatus}
        onDeleteStudent={handleDeleteStudent}
        onUpdateStudent={handleUpdateStudent}
      />
        <Pagination></Pagination>
    </div>
  );
};

export default App;
