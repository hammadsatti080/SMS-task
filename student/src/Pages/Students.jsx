import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents, deleteStudent } from '../api/studentApi';
import StudentList from '../Components/StudentList';
import Swal from 'sweetalert2';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      
      Swal.fire({
        title: 'Loading...',
        text: 'Fetching students data',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const data = await getStudents();
      console.log('Fetched students:', data);
      setStudents(data || []);
      
      Swal.close();
      
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
      
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load students. Please check if JSON server is running.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Correct route for edit
  const handleEdit = (id) => {
    console.log('Navigating to edit student with ID:', id);
    navigate(`/edit-student/${id}`); // ✅ Change from '/edit/' to '/edit-student/'
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error('Delete student error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete student. Please try again.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    }
  };

  const handleRefresh = () => {
    fetchStudents();
    
    Swal.fire({
      title: 'Refreshed!',
      text: 'Student list has been updated.',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px'
  };

  const addButtonStyle = {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  };

  const refreshButtonStyle = {
    padding: '12px 24px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  };

  const loadingStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    fontSize: '18px',
    color: '#666',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Student Management System</h1>
      
      <div style={buttonContainerStyle}>
        <button 
          style={addButtonStyle}
          onClick={() => navigate('/add-student')}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#45a049';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#4CAF50';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          + Add New Student
        </button>
        
        <button 
          style={refreshButtonStyle}
          onClick={handleRefresh}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#1976D2';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#2196F3';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          ↻ Refresh List
        </button>
      </div>

      {loading ? (
        <div style={loadingStyle}>
          <div style={{ fontSize: '48px' }}>⏳</div>
          <h3>Loading Students...</h3>
          <p>Please wait while we fetch the student data.</p>
        </div>
      ) : (
        <StudentList 
          students={students} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default Students;