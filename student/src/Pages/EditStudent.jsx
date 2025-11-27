import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentById, updateStudent } from '../api/studentApi';
import StudentForm from '../Components/StudentForm';
import Swal from 'sweetalert2';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      console.log('Fetching student with ID:', id);
      
      const studentData = await getStudentById(id);
      console.log('Student data received:', studentData);
      
      if (!studentData) {
        Swal.fire({
          title: 'Student Not Found',
          text: 'The student you are trying to edit does not exist.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          navigate('/students');
        });
        return;
      }
      
      setStudent(studentData);
    } catch (error) {
      console.error('Error fetching student:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load student data. Please try again.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        navigate('/students');
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (studentData) => {
    try {
      setSubmitting(true);
      
      // Show confirmation dialog before updating
      const result = await Swal.fire({
        title: 'Update Student?',
        html: `Are you sure you want to update <strong>${studentData.name}</strong>?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel'
      });

      if (!result.isConfirmed) {
        setSubmitting(false);
        return;
      }

      console.log('Updating student ID:', id, 'with data:', studentData);
      
      // Show loading state
      Swal.fire({
        title: 'Updating Student...',
        text: 'Please wait while we update the student information.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      await updateStudent(id, studentData);
      
      // Success message
      await Swal.fire({
        title: 'Success!',
        html: `<strong>${studentData.name}</strong> has been updated successfully!`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        timer: 2000,
        showConfirmButton: false
      });
      
      navigate('/students');
      
    } catch (error) {
      console.error('Update student error:', error);
      
      let errorMessage = 'Error updating student. Please try again.';
      if (error.response?.status === 404) {
        errorMessage = 'Student not found. It may have been deleted.';
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid data. Please check the information and try again.';
      }
      
      Swal.fire({
        title: 'Update Failed!',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    Swal.fire({
      title: 'Discard Changes?',
      text: 'You have unsaved changes. Are you sure you want to leave?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, leave page',
      cancelButtonText: 'Stay on page'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/students');
      }
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

  const backButtonStyle = {
    padding: '12px 24px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
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

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e1e5e9'
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          <div style={{ fontSize: '48px' }}>⏳</div>
          <h3>Loading Student Data...</h3>
          <p>Please wait while we fetch the student information.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <button 
        style={backButtonStyle}
        onClick={handleBack}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#5a6268';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#6c757d';
          e.target.style.transform = 'translateY(0)';
        }}
        disabled={submitting}
      >
        <span>←</span>
        Back to Students
      </button>
      
      <div style={cardStyle}>
        <h1 style={headerStyle}>Edit Student</h1>
        {student ? (
          <StudentForm 
            student={student} 
            onSubmit={handleSubmit} 
            buttonText={submitting ? "Updating..." : "Update Student"}
            disabled={submitting}
          />
        ) : (
          <div style={loadingStyle}>
            <div style={{ fontSize: '48px' }}>❌</div>
            <h3>Student Not Found</h3>
            <p>The student you are looking for does not exist.</p>
            <button 
              style={backButtonStyle}
              onClick={() => navigate('/students')}
            >
              Back to Students List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditStudent;