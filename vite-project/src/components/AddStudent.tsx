import React, { useState } from 'react';
import './style.css';

interface Student {
  id: string;
  name: string;
  dob: string;
  email: string;
  status: 'active' | 'inactive';
}

interface AddStudentProps {
  onAddStudent: (student: Student) => void;
}

const AddStudent: React.FC<AddStudentProps> = ({ onAddStudent }) => {
  const [showForm, setShowForm] = useState(false);
  const [student, setStudent] = useState<Omit<Student, 'status'>>({
    id: '',
    name: '',
    dob: '',
    email: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onAddStudent({ ...student, status: 'active' }); // Add default status
      setStudent({ id: '', name: '', dob: '', email: '' }); // Reset form
      setShowForm(false);
      setError('');
      alert('Thêm mới tài khoản thành công');
    }
  };

  const validateForm = (): boolean => {
    const { id, name, dob, email } = student;
    if (!id || !name || !dob || !email) {
      setError('Tất cả các trường đều bắt buộc.');
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Định dạng email không hợp lệ.');
      return false;
    }
    return true;
  };

  return (
    <div className="add-student-container">
      <p className="title"><b>Quản lý sinh viên</b></p>
      <button id='addStudent' className='btn btn-primary' onClick={() => setShowForm(true)}>
        Thêm mới sinh viên
      </button>

      {showForm && (
        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Mã sinh viên</label>
              <input type='text' name='id' value={student.id} onChange={handleChange} />
            </div>
            <div>
              <label>Tên sinh viên</label>
              <input type='text' name='name' value={student.name} onChange={handleChange} />
            </div>
            <div>
              <label>Ngày sinh</label>
              <input type='date' name='dob' value={student.dob} onChange={handleChange} />
            </div>
            <div>
              <label>Email</label>
              <input type='email' name='email' value={student.email} onChange={handleChange} />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type='submit' className='btn btn-success'>Xác nhận</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
