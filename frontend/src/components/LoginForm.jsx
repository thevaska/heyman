import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/jwt/create/', formData);
      const token = res.data.access;
      localStorage.setItem('token', token);

      // Запит до /me/ щоб зберегти роль користувача
      const profileRes = await axios.get('http://127.0.0.1:8000/api/users/me/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.setItem('role', profileRes.data.role);

      onLogin(token);
    } catch {
      setError('Невірний email або пароль');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Вхід</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      /><br />
      <input
        type="password"
        name="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={handleChange}
        required
      /><br />
      <button type="submit">Увійти</button>
    </form>
  );
}

export default LoginForm;