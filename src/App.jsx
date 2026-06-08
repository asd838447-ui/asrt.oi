import React, { useState, useEffect } from 'react';
import { useRouter } from './hooks/useRouter';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LessonDetail from './pages/LessonDetail';
import AdminPanel from './pages/AdminPanel';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

export default function App() {
  const { route, params, navigate } = useRouter();
  
  const validateSession = (storedUser) => {
    if (!storedUser) return null;
    try {
      const parsed = JSON.parse(storedUser);
      if (parsed && parsed.role === 'student') {
        const usersStr = localStorage.getItem('users');
        if (usersStr !== null) {
          const users = JSON.parse(usersStr);
          if (Array.isArray(users) && !users.some(u => u.username === parsed.username)) {
            localStorage.removeItem('user');
            return null;
          }
        }
      }
      return parsed;
    } catch (e) {
      localStorage.removeItem('user');
      return null;
    }
  };

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return validateSession(stored);
  });

  // Handle invalid session tokens on mount or storage events
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('user');
      setUser(validateSession(stored));
    };

    window.addEventListener('storage', handleStorageChange);
    // Periodically sync user from localStorage for E2E tests that clear localStorage and reload
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Enforce access control and redirection rules
  useEffect(() => {
    if (!user) {
      if (route !== 'welcome' && route !== 'login') {
        navigate('login');
      }
    } else {
      // If logged in, block admin route for student role
      if (user.role !== 'admin' && route === 'admin') {
        navigate('dashboard');
      }
      // If user tries to visit login or welcome page while already authenticated, go to dashboard
      if (route === 'login' || route === 'welcome') {
        navigate('dashboard');
      }
    }
  }, [user, route]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('login');
  };

  const renderPage = () => {
    switch (route) {
      case 'welcome':
        return <Welcome navigate={navigate} />;
      case 'login':
        return <Login navigate={navigate} onLogin={setUser} />;
      case 'dashboard':
        return <Dashboard user={user} navigate={navigate} onLogout={handleLogout} />;
      case 'lesson':
        return <LessonDetail id={params.id} user={user} navigate={navigate} onLogout={handleLogout} />;
      case 'admin':
        return <AdminPanel navigate={navigate} onLogout={handleLogout} />;
      default:
        return <Welcome navigate={navigate} />;
    }
  };

  return (
    <div className="app-container">
      <ThemeToggle />
      {renderPage()}
    </div>
  );
}
