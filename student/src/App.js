import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './PublicPages/Navbar';
import Students from './Pages/Students';
import AddStudent from './Pages/AddStudent';
import EditStudent from './Pages/EditStudent';


function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
         
          
          {/* New Student Management Routes */}
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/students" element={<Students />} />
         
         {/* <Route path="/edit/:id" element={<EditStudent />} />*/}
          <Route path="/edit-student/:id" element={<EditStudent />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;