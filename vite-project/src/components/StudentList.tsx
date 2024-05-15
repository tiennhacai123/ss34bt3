import React, { useState } from 'react';

interface Student {
  id: string;
  name: string;
  dob: string;
  email: string;
  status: 'active' | 'inactive';
}

interface StudentListProps {
  students: Student[];
  onUpdateStudentStatus: (id: string, status: 'active' | 'inactive') => void;
  onDeleteStudent: (id: string) => void;
  onUpdateStudent: (student: Student) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onUpdateStudentStatus, onDeleteStudent, onUpdateStudent }) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setSelectedStudent(null);
    setIsEditing(false);
  };

  const handleUpdateClick = () => {
    if (selectedStudent) {
      onUpdateStudent(selectedStudent);
      setSelectedStudent(null);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedStudent(prevStudent => ({
      ...prevStudent!,
      [name]: value,
    }));
  };

  const handleBlockClick = (id: string) => {
    onUpdateStudentStatus(id, 'inactive');
  };

  return (
    <div className="student-list-container" style={{marginTop:100}}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Mã sinh viên</th>
            <th scope="col">Tên sinh viên</th>
            <th scope="col">Ngày sinh</th>
            <th scope="col">Email</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <th scope="row">{index + 1}</th>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.dob}</td>
              <td>{student.email}</td>
              <td>
                <button
                  type="button"
                  className={`btn ${student.status === 'active' ? 'btn-outline-success' : 'btn-outline-danger'}`}
                  onClick={() => handleBlockClick(student.id)}
                  disabled={student.status === 'inactive'}
                >
                  {student.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                </button>
              </td>
              <td>
                <button type="button" className="btn btn-outline-secondary" onClick={() => handleEditClick(student)}>Sửa</button>
                <button type="button" className="btn btn-outline-danger" onClick={() => onDeleteStudent(student.id)}>Xoá</button>
                {student.status === 'active' && (
                  <button type="button" className="btn btn-outline-danger" onClick={() => handleBlockClick(student.id)}>Chặn</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && selectedStudent && (
        <div className="edit-form">
          <h3>Cập nhật sinh viên</h3>
          <label>
            Mã sinh viên:
            <input type="text" name="id" value={selectedStudent.id} onChange={handleInputChange} />
          </label>
          <label>
            Tên sinh viên:
            <input type="text" name="name" value={selectedStudent.name} onChange={handleInputChange} />
          </label>
          <label>
            Ngày sinh:
            <input type="text" name="dob" value={selectedStudent.dob} onChange={handleInputChange} />
          </label>
          <label>
            Email:
            <input type="text" name="email" value={selectedStudent.email} onChange={handleInputChange} />
          </label>
          <button onClick={handleUpdateClick}>Cập nhật</button>
          <button onClick={handleCancelEdit}>Huỷ</button>
        </div>
      )}
    </div>
  );
};
export default StudentList;
