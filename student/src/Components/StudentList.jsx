import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const StudentList = ({ students, onEdit, onDelete }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // SweetAlert Delete Confirmation
  const handleDelete = (studentId, studentName) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${studentName}. This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        confirmButton: 'custom-swal-confirm',
        cancelButton: 'custom-swal-cancel'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(studentId);
        
        Swal.fire({
          title: 'Deleted!',
          text: `${studentName} has been deleted successfully.`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  // Secure Delete with Confirmation
  const handleSecureDelete = (studentId, studentName) => {
    Swal.fire({
      title: 'Confirm Deletion',
      html: `Please type <strong style="color: #4CAF50;">${studentName}</strong> to confirm deletion:`,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        placeholder: 'Type the student name here'
      },
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      preConfirm: (inputValue) => {
        if (inputValue !== studentName) {
          Swal.showValidationMessage('The name does not match!');
        }
        return inputValue;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(studentId);
        Swal.fire({
          title: 'Permanently Deleted!',
          text: `${studentName} has been permanently removed from the system.`,
          icon: 'success',
          confirmButtonColor: '#3085d6'
        });
      }
    });
  };

  // ✅ FIXED: Responsive Styles - No horizontal scrolling
  const containerStyle = {
    padding: isMobile ? '10px 8px' : '20px',
    overflowX: 'hidden', // ✅ Prevent horizontal scrolling
    minHeight: '100vh',
    width: '100%',
    boxSizing: 'border-box',
    maxWidth: '100%', // ✅ Ensure container doesn't exceed screen width
    margin: '0 auto'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    minWidth: isMobile ? '100%' : '900px',
    tableLayout: 'fixed',
    maxWidth: '100%' // ✅ Ensure table doesn't exceed container
  };

  const headerStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: isMobile ? '12px 8px' : '16px',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: isMobile ? '13px' : '16px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const cellStyle = {
    padding: isMobile ? '12px 8px' : '14px',
    borderBottom: '1px solid #e9ecef',
    textAlign: 'left',
    fontSize: isMobile ? '13px' : '14px',
    verticalAlign: 'middle',
    wordWrap: 'break-word',
    overflow: 'hidden'
  };

  // ✅ FIXED: Button container style for proper alignment
  const buttonContainerStyle = {
    display: 'flex',
    gap: isMobile ? '4px' : '6px',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minWidth: '220px'
  };

  // ✅ FIXED: Edit button style - Compact but visible
  const editButtonStyle = {
    padding: isMobile ? '8px 6px' : '10px 8px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: isMobile ? '11px' : '12px',
    fontWeight: '600',
    minWidth: isMobile ? '50px' : '60px',
    transition: 'all 0.3s ease',
    flex: '1',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    width: '100%',
    boxSizing: 'border-box'
  };

  // ✅ FIXED: Delete button style - Compact but visible
  const deleteButtonStyle = {
    padding: isMobile ? '8px 6px' : '10px 8px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: isMobile ? '11px' : '12px',
    fontWeight: '600',
    minWidth: isMobile ? '50px' : '60px',
    transition: 'all 0.3s ease',
    flex: '1',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    width: '100%',
    boxSizing: 'border-box'
  };

  // ✅ FIXED: Secure delete button style - Compact but visible
  const secureDeleteButtonStyle = {
    padding: isMobile ? '8px 6px' : '10px 8px',
    backgroundColor: '#ff9800',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: isMobile ? '11px' : '12px',
    fontWeight: '600',
    minWidth: isMobile ? '60px' : '70px',
    transition: 'all 0.3s ease',
    flex: '1',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const noStudentsStyle = {
    textAlign: 'center',
    padding: isMobile ? '50px 20px' : '60px 40px',
    color: '#666',
    fontSize: isMobile ? '16px' : '18px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    margin: isMobile ? '10px 0' : '20px 0',
    width: '100%',
    boxSizing: 'border-box',
    maxWidth: '100%' // ✅ Ensure no overflow
  };

  // ✅ FIXED: Enhanced Mobile Card Component - No horizontal movement
  const MobileStudentCard = ({ student, index }) => (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e9ecef',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '100%' // ✅ Prevent card from exceeding screen
      }}
      key={student.id || index}
    >
      {/* Header Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        paddingBottom: '12px',
        borderBottom: '2px solid #4CAF50',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ flex: 1, minWidth: 0 }}> {/* ✅ Added minWidth: 0 for text truncation */}
          <div style={{ 
            color: '#4CAF50', 
            fontSize: '11px', 
            textTransform: 'uppercase',
            fontWeight: '600',
            marginBottom: '4px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            STUDENT ID
          </div>
          <div style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            color: '#2c3e50',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            #{student.id}
          </div>
        </div>
        <span style={{
          backgroundColor: '#e8f5e8',
          color: '#2e7d32',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: '700',
          flexShrink: 0 // ✅ Prevent shrinking
        }}>
          ACTIVE
        </span>
      </div>
      
      {/* Student Information */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        marginBottom: '20px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Name */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          width: '100%'
        }}>
          <div style={{ 
            color: '#4CAF50', 
            fontSize: '11px', 
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            FULL NAME
          </div>
          <div style={{ 
            fontSize: '16px', 
            fontWeight: '600',
            color: '#2c3e50',
            lineHeight: '1.4',
            wordBreak: 'break-word', // ✅ Break long names
            width: '100%'
          }}>
            {student.name}
          </div>
        </div>
        
        {/* Email */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          width: '100%'
        }}>
          <div style={{ 
            color: '#4CAF50', 
            fontSize: '11px', 
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            EMAIL ADDRESS
          </div>
          <div style={{ 
            fontSize: '14px', 
            color: '#666',
            lineHeight: '1.4',
            wordBreak: 'break-all', // ✅ Break long emails
            width: '100%'
          }}>
            {student.email}
          </div>
        </div>
        
        {/* Course and Phone */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          width: '100%'
        }}>
          {/* Course */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flex: '1',
            minWidth: '120px',
            maxWidth: 'calc(50% - 6px)' // ✅ Ensure it stays within bounds
          }}>
            <div style={{ 
              color: '#4CAF50', 
              fontSize: '11px', 
              textTransform: 'uppercase',
              fontWeight: '600'
            }}>
              COURSE
            </div>
            <div style={{ 
              fontSize: '14px',
              backgroundColor: '#e3f2fd',
              color: '#1565c0',
              padding: '6px 12px',
              borderRadius: '8px',
              fontWeight: '600',
              textAlign: 'center',
              wordBreak: 'break-word'
            }}>
              {student.course}
            </div>
          </div>
          
          {/* Phone */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flex: '1',
            minWidth: '120px',
            maxWidth: 'calc(50% - 6px)' // ✅ Ensure it stays within bounds
          }}>
            <div style={{ 
              color: '#4CAF50', 
              fontSize: '11px', 
              textTransform: 'uppercase',
              fontWeight: '600'
            }}>
              PHONE
            </div>
            <div style={{ 
              fontSize: '14px', 
              color: '#666',
              fontFamily: 'monospace, sans-serif',
              padding: '6px 12px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: '500',
              wordBreak: 'break-word'
            }}>
              {student.phone}
            </div>
          </div>
        </div>
      </div>
      
      {/* ✅ FIXED: Action Buttons - Full width and properly aligned */}
      <div style={{
        display: 'flex',
        gap: '8px',
        paddingTop: '16px',
        borderTop: '1px solid #f0f0f0',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <button 
          style={{
            ...editButtonStyle,
            flex: '1'
          }}
          onClick={() => onEdit(student.id)}
        >
          <span>✏️</span>
          Edit
        </button>
        <button 
          style={{
            ...deleteButtonStyle,
            flex: '1'
          }}
          onClick={() => handleDelete(student.id, student.name)}
        >
          <span>🗑️</span>
          Delete
        </button>
      </div>
    </div>
  );

  if (!students || students.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={noStudentsStyle}>
          <div style={{ 
            fontSize: '64px', 
            marginBottom: '20px', 
            color: '#4CAF50' 
          }}>📚</div>
          <h3 style={{ 
            marginBottom: '12px', 
            color: '#2c3e50',
            fontSize: '22px',
            fontWeight: '600'
          }}>
            No Students Found
          </h3>
          <p style={{ 
            color: '#666', 
            margin: 0,
            fontSize: '16px',
            lineHeight: '1.5'
          }}>
            Add some students to get started with your management system!
          </p>
        </div>
      </div>
    );
  }

  // Mobile View - Card Layout
  if (isMobile) {
    return (
      <div style={containerStyle}>
        <style>
          {`
            /* ✅ FIXED: Global mobile fixes to prevent horizontal scrolling */
            body {
              overflow-x: hidden !important;
              max-width: 100vw !important;
            }
            html {
              overflow-x: hidden !important;
            }
            .mobile-container {
              width: 100% !important;
              max-width: 100% !important;
              overflow-x: hidden !important;
            }
          `}
        </style>
        <div 
          className="mobile-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            maxWidth: '100%',
            overflowX: 'hidden'
          }}
        >
          {students.map((student, index) => (
            <MobileStudentCard key={student.id || index} student={student} index={index} />
          ))}
        </div>
      </div>
    );
  }

  // Desktop View - Table Layout
  return (
    <div style={containerStyle}>
      <style>
        {`
          .custom-swal-popup {
            border-radius: 12px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          .custom-swal-title {
            color: #2c3e50;
            font-size: 1.5rem;
            font-weight: 600;
          }
          .custom-swal-confirm {
            border-radius: 6px;
            font-weight: 600;
            padding: 10px 24px;
          }
          .custom-swal-cancel {
            border-radius: 6px;
            font-weight: 600;
            padding: 10px 24px;
          }

          /* ✅ FIXED: Ensure buttons take full available space */
          .action-buttons {
            width: 100%;
            min-width: 220px;
          }

          /* ✅ FIXED: Table cell width adjustments */
          .actions-cell {
            width: 25% !important;
            min-width: 220px;
          }

          /* ✅ FIXED: Global overflow prevention */
          * {
            max-width: 100%;
          }
        `}
      </style>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{...headerStyle, width: '8%'}}>ID</th>
            <th style={{...headerStyle, width: '18%'}}>Name</th>
            <th style={{...headerStyle, width: '22%'}}>Email</th>
            <th style={{...headerStyle, width: '15%'}}>Course</th>
            <th style={{...headerStyle, width: '12%'}}>Phone</th>
            <th style={{...headerStyle, width: '25%', textAlign: 'center'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr 
              key={student.id || index}
              style={{
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <td style={cellStyle}>
                <strong style={{ color: '#4CAF50', fontSize: '14px' }}>#{student.id}</strong>
              </td>
              <td style={cellStyle}>
                <div style={{ fontWeight: '600', color: '#2c3e50', fontSize: '14px' }}>{student.name}</div>
              </td>
              <td style={cellStyle}>
                <div style={{ 
                  color: '#666',
                  wordBreak: 'break-word',
                  fontSize: '13px'
                }}>{student.email}</div>
              </td>
              <td style={cellStyle}>
                <span style={{
                  backgroundColor: '#e8f5e8',
                  color: '#2e7d32',
                  padding: '6px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '600',
                  display: 'inline-block'
                }}>
                  {student.course}
                </span>
              </td>
              <td style={cellStyle}>
                <div style={{ 
                  fontFamily: 'monospace',
                  color: '#666',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>{student.phone}</div>
              </td>
              <td style={{...cellStyle, width: '25%'}} className="actions-cell">
                <div style={buttonContainerStyle} className="action-buttons">
                  <button 
                    style={editButtonStyle}
                    onClick={() => onEdit(student.id)}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#1976D2';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#2196F3';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <span>✏️</span>
                    Edit
                  </button>
                  <button 
                    style={deleteButtonStyle}
                    onClick={() => handleDelete(student.id, student.name)}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#d32f2f';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#f44336';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <span>🗑️</span>
                    Delete
                  </button>
                  <button 
                    style={secureDeleteButtonStyle}
                    onClick={() => handleSecureDelete(student.id, student.name)}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#f57c00';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#ff9800';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <span>🔒</span>
                    Secure
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;