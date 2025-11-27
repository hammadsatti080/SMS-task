import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Backbutton = ({ 
  text = "Back to Students", 
  onClick, 
  disabled = false,
  showConfirmation = true,
  customStyle = {} 
}) => {
  const navigate = useNavigate();

  const handleDefaultBack = () => {
    if (showConfirmation) {
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
    } else {
      navigate('/students');
    }
  };

  const handleClick = onClick || handleDefaultBack;

  const backButtonStyle = {
    padding: '12px 24px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'block', // ✅ Change to block
    margin: '0 auto 20px auto', // ✅ This centers block elements
    width: 'fit-content'
  };

  return (
    <button 
      style={backButtonStyle}
      onClick={handleClick}
      onMouseOver={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = '#5a6268';
          e.target.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseOut={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = '#6c757d';
          e.target.style.transform = 'translateY(0)';
        }
      }}
      disabled={disabled}
    >
      <span>←</span>
      {text}
    </button>
  );
};

export default Backbutton;