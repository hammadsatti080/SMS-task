import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentForm = ({ student, onSubmit, buttonText = "Submit", disabled = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      console.log('StudentForm received student data:', student);
      setFormData({
        name: student.name || '',
        email: student.email || '',
        course: student.course || '',
        phone: student.phone || ''
      });
    }
  }, [student]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    setErrors(newErrors);
    
    // Show toast for validation errors
    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fix all form errors!', {
        position: "top-right",
        autoClose: 3000,
      });
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px'
  };

  const formStyle = {
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd'
  };

  const formGroupStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '14px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box'
  };

  const inputErrorStyle = {
    ...inputStyle,
    borderColor: '#f44336'
  };

  const errorTextStyle = {
    color: '#f44336',
    fontSize: '12px',
    marginTop: '5px',
    display: 'block'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: disabled ? '#6c757d' : '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      {/* Toast Container for validation errors */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label htmlFor="name" style={labelStyle}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={errors.name ? inputErrorStyle : inputStyle}
            placeholder="Enter full name"
            disabled={disabled}
          />
          {errors.name && <span style={errorTextStyle}>{errors.name}</span>}
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="email" style={labelStyle}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={errors.email ? inputErrorStyle : inputStyle}
            placeholder="Enter email address"
            disabled={disabled}
          />
          {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="course" style={labelStyle}>Course:</label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            style={errors.course ? inputErrorStyle : inputStyle}
            placeholder="Enter course name"
            disabled={disabled}
          />
          {errors.course && <span style={errorTextStyle}>{errors.course}</span>}
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="phone" style={labelStyle}>Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={errors.phone ? inputErrorStyle : inputStyle}
            placeholder="Enter 10-digit phone number"
            disabled={disabled}
          />
          {errors.phone && <span style={errorTextStyle}>{errors.phone}</span>}
        </div>

        <button 
          type="submit" 
          style={buttonStyle}
          onMouseOver={(e) => !disabled && (e.target.style.backgroundColor = '#45a049')}
          onMouseOut={(e) => !disabled && (e.target.style.backgroundColor = '#4CAF50')}
          disabled={disabled}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;