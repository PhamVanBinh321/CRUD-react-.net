import axios from 'axios';

// Thay đổi URL này theo đúng URL của WebAPI .NET của bạn
const API_BASE_URL = 'http://localhost:5135/api/Student'; // Chú ý: Student chứ không phải students

const studentService = {
  // Lấy tất cả sinh viên
  getAllStudents: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  // Các hàm khác giữ nguyên...
  getStudentById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching student with id ${id}:`, error);
      throw error;
    }
  },

  createStudent: async (student) => {
    try {
      const response = await axios.post(API_BASE_URL, student);
      return response.data;
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  },

  updateStudent: async (id, student) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, student);
      return response.data;
    } catch (error) {
      console.error(`Error updating student with id ${id}:`, error);
      throw error;
    }
  },

  deleteStudent: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting student with id ${id}:`, error);
      throw error;
    }
  }
};

export default studentService;