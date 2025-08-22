
import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

const LoginForm = ({ setIsAuthenticated, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://chakrax-backend1-22.onrender.com/login/', formData);
      const { token } = res.data;

      localStorage.setItem('token', token);
      setSuccess('✅ Logged in successfully!');
      setIsAuthenticated(true);
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('❌ User not registered. Redirecting to registration...');
        setTimeout(() => {
          onSwitchToRegister(); // Switch after short delay
        }, 2000);
      } else {
        setError('❌ Login failed. Please try again.');
      }
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {/* ✅ Back to Register button */}
      <div style={{ marginTop: '1rem' }}>
        <p className="link-button" onClick={onSwitchToRegister}>
          ⬅ Back to Register
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
