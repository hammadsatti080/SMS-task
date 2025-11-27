import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../api/studentApi';
import StudentForm from '../Components/StudentForm';
import Swal from 'sweetalert2';
import Backbutton from '../PublicPages/Backbutton';
import { toast } from 'react-toastify';

const AddStudent = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (studentData) => {
    try {
      setSubmitting(true);
      
      // Show loading with SweetAlert
      Swal.fire({
        title: 'Adding Student...',
        text: 'Please wait while we add the new student.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      console.log('Submitting new student:', studentData);
      await addStudent(studentData);
      
      // Close loading SweetAlert
      Swal.close();
      
      // Show success with Toast (quick feedback)
      toast.success(`Student ${studentData.name} added successfully! 🎉`, {
        position: "top-right",
        autoClose: 3000,
      });

      // Also show SweetAlert success (more prominent)
      await Swal.fire({
        title: 'Success!',
        html: `<strong>${studentData.name}</strong> has been added successfully!`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'View Students',
        showCancelButton: true,
        cancelButtonText: 'Add Another'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/students');
        }
        // If "Add Another", stay on page (form will be reset by StudentForm)
      });
      
    } catch (error) {
      console.error('Add student error:', error);
      
      // Close any open dialogs
      Swal.close();
      
      // Show error with Toast (quick feedback)
      toast.error('Failed to add student!', {
        position: "top-right",
        autoClose: 3000,
      });
      
      // Also show SweetAlert error (more detailed)
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add student. Please check if JSON server is running.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    // Use SweetAlert for confirmation dialog
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
        // Show toast for quick feedback
        toast.info('Navigation cancelled', {
          position: "top-right",
          autoClose: 2000,
        });
        navigate('/students');
      } else {
        // Show toast for staying on page
        toast.info('Stay on current page', {
          position: "top-right",
          autoClose: 2000,
        });
      }
    });
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
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

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Add New Student</h1>
      <StudentForm 
        onSubmit={handleSubmit} 
        buttonText={submitting ? "Adding Student..." : "Add Student"}
        disabled={submitting}
      />
      <Backbutton onClick={handleBack} />
    </div>
  );
};

export default AddStudent;