import React, { useState } from 'react';
import Calendar from './components/Calendar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import CreateEventForm from './components/CreateEventForm';
import CreateTaskForm from './components/CreateTaskForm';
import TaskList from './components/TaskList';
import UserStats from './components/UserStats';
import EventDetails from './components/EventDetails';
import TaskDetails from './components/TaskDetails';
import GradesList from './components/GradesList';
import ChildrenList from './components/ChildrenList';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ResetPasswordConfirmForm from './components/ResetPasswordConfirmForm';
import UserProfile from './components/UserProfile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const role = localStorage.getItem('role');

const [token, setToken] = useState(localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Шкільний календар</h1>
      {token ? (
        <>
          <button onClick={handleLogout}>Вийти</button>
          {role !== 'student' && (<CreateEventForm token={token} onEventCreated={() => window.location.reload()} />)}
          {role !== 'student' && (<CreateTaskForm token={token} onTaskCreated={() => window.location.reload()} />)}
          <TaskList token={token} />
          <UserStats token={token} />
          <GradesList token={token} />
          <Calendar token={token} />
        </>
      ) : showReset ? (
        <ForgotPasswordForm />
      ) : showRegister ? (
        <>
          <RegisterForm onRegister={handleLogin} />
          <p>
            Вже маєте акаунт?{' '}
            <button onClick={() => setShowRegister(false)}>Увійти</button>
          </p>
        </>
      ) : (
        <>
          <LoginForm onLogin={handleLogin} />
          <button onClick={() => setShowReset(true)}>Забули пароль?</button>
          <p>
            Немає акаунту?{' '}
            <button onClick={() => setShowRegister(true)}>Зареєструватися</button>
          </p>
        </>
      )}
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/event/:id" element={<EventDetails token={localStorage.getItem('token')} />} />
        <Route path="/task/:id" element={<TaskDetails token={localStorage.getItem('token')} />} />
        <Route path="/children" element={<ChildrenList token={localStorage.getItem("token")} />} />
        <Route path="/grades/:id" element={<GradesList token={localStorage.getItem("token")} />} />
        <Route path="/reset-password-confirm" element={<ResetPasswordConfirmForm />} />
        <Route path="/profile" element={<UserProfile token={localStorage.getItem('token')} />} />
      </Routes>
    </Router>
  );
}