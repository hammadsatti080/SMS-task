import axios from 'axios';

const API_BASE = 'http://localhost:3001';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Get all students
export const getStudents = async () => {
  try {
    const response = await api.get('/students');
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

// Add new student with auto-generated ID
export const addStudent = async (studentData) => {
  try {
    console.log('Sending data to server:', studentData);
    
    // First get all students to determine the next ID
    const allStudents = await getStudents();
    
    // Find the highest ID and increment by 1
    const maxId = allStudents.length > 0 
      ? Math.max(...allStudents.map(student => parseInt(student.id) || 0))
      : 0;
    
    const nextId = (maxId + 1).toString();
    
    console.log('Auto-generating ID:', nextId);
    
    const response = await api.post('/students', {
      id: nextId, // Add auto-generated ID
      name: studentData.name,
      email: studentData.email,
      course: studentData.course,
      phone: studentData.phone
    });
    
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
    console.error('Error response:', error.response);
    throw error;
  }
};

// Update student
export const updateStudent = async (id, studentData) => {
  try {
    console.log('Updating student ID:', id, 'with data:', studentData);
    const response = await api.put(`/students/${id}`, studentData);
    console.log('Update response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

// Delete student
export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

// Get student by ID
export const getStudentById = async (id) => {
  try {
    console.log('Fetching student with ID:', id);
    const response = await api.get(`/students/${id}`);
    console.log('Student data received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching student:', error);
    throw error;
  }
};