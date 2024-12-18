// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login';
import MainScreen from './pages/main';
import AddStudent from './pages/addStudent';
import StudentDetail from './pages/student';
import EditStudent from './pages/editStudent';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true); // Изменяем статус авторизации на true
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/main" /> : <Login onLogin={handleLogin} />} />
        <Route path="/students/:id" element={isAuthenticated ? <StudentDetail /> : <Navigate to="/login" />} />
        <Route path="/main" element={isAuthenticated ? <MainScreen /> : <Navigate to="/login" />} />
        <Route path="/addStudent" element={isAuthenticated ? <AddStudent /> : <Navigate to="/login" />} />
        <Route path="/edit-student/:id" element={isAuthenticated ? <EditStudent /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} /> {/* Перенаправляем на страницу логина по умолчанию */}
      </Routes>
    </Router>
  );
}

export default App;
