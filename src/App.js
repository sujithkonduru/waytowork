// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Category from './components/Category';
import About from './components/About';
import ClientDashboard from './components/ClientDashboard';
import WorkerDashboard from './components/WorkerDashboard';
import AdminDashboard from './components/AdminDashboard';
import BookWorker from './components/BookWorker';
import ResetPassword from './components/ResetPassword';
import WorkerProfile from './components/Profile';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />}/>  
        <Route path="/login" element={<Login />}/>   
        <Route path="/category/:skills" element={<Category />} />
        <Route path="/about" element={<About />} />
        <Route path="/client/dashboard/:clientId" element={<ClientDashboard />}/>
        <Route path="/worker/dashboard/:workerId" element={<WorkerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/booking/create/:clientId/:workerId" element={<BookWorker />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<WorkerProfile />} />




      </Routes>
    </Router>
  );
};

export default App;
