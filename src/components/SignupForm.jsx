// components/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

const RegisterForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', formData);
      const data = response.data;

      if (data.token) {
        setMessage('✅ Registered successfully! Redirecting to login...');
        setFormData({ username: '', email: '', phone_number: '', password: '' });

        // Redirect to login after 2 seconds
        setTimeout(() => {
          onSwitchToLogin();
        }, 2000);
      }
    } catch (error) {
      if (error.response?.data?.error) {
        setMessage('❌ ' + error.response.data.error);
      } else {
        setMessage('❌ Something went wrong. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {message && (
        <p className={`register-message ${message.startsWith('✅') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}

      {/* ✅ Back to Login button */}
      <div style={{ marginTop: '1rem' }}>
        <button className="link-button" onClick={onSwitchToLogin}>
          ⬅ Back to Login
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
