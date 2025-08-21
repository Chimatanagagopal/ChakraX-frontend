

// App.js
import React, { useEffect, useState } from 'react';
import './style.css';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import MainApp from './components/main';

export const handleLogout = (setIsAuthenticated) => {
  localStorage.removeItem('token');
  setIsAuthenticated(false);
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <>
      {!isAuthenticated ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          {showLogin ? (
            <>
              <LoginForm
                setIsAuthenticated={setIsAuthenticated}
                onSwitchToRegister={() => setShowLogin(false)}
              />
              <p>
                Don't have an account?{' '}
                <button onClick={() => setShowLogin(false)}>Register</button>
              </p>
            </>
          ) : (
            <>
             <SignupForm
  setIsAuthenticated={setIsAuthenticated}
  onSwitchToLogin={() => setShowLogin(true)}
/>
              <p>
                Already have an account?{' '}
                <button onClick={() => setShowLogin(true)}>Login</button>
              </p>
            </>
          )}
        </div>
      ) : (
        <MainApp setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
}

export default App;
