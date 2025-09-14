import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import StudentCard from './StudentCard';
import StudentForm from './StudentForm';
import studentService from '../services/studentService';
import { useNotification } from '../contexts/NotificationContext'; // Thêm import

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
const { showSuccess, showError, showInfo } = useNotification(); // Sử dụng context
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getAllStudents();
      setStudents(data);
      showInfo(`Đã tải ${data.length} sinh viên`);
    } catch (error) {
      console.error('Failed to load students:', error);
      showError('Không thể tải danh sách sinh viên. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (studentData) => {
    try {
      if (editingStudent) {
        await studentService.updateStudent(studentData.id, studentData);
        showSuccess('Cập nhật sinh viên thành công!');
      } else {
        await studentService.createStudent(studentData);
        showSuccess('Thêm sinh viên thành công!');
      }
      await loadStudents();
      setShowForm(false);
      setEditingStudent(null);
    } catch (error) {
      console.error('Failed to save student:', error);
      showError('Không thể lưu thông tin sinh viên. Vui lòng thử lại.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
      try {
        await studentService.deleteStudent(id);
        await loadStudents();
        showSuccess('Xóa sinh viên thành công!');
      } catch (error) {
        console.error('Failed to delete student:', error);
        showError('Không thể xóa sinh viên. Vui lòng thử lại.');
      }
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const filteredStudents = students.filter(student =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (student.mobile && student.mobile.includes(searchTerm))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Quản Lý Sinh Viên</h1>
        <button
          onClick={() => {
            setEditingStudent(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={16} />
          Thêm Sinh Viên
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Students Grid */}
      {showForm ? (
        <StudentForm
          student={editingStudent}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingStudent(null);
          }}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Không tìm thấy sinh viên</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentList;