import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm({ onRegister }) {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', role: 'student'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://127.0.0.1:8000/api/register/', formData);
      setSuccess('Акаунт створено! Входимо...');
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/auth/jwt/create/', {
          username: formData.username,
          password: formData.password
        });
        onRegister(res.data.access);
      } catch {
        setSuccess('Акаунт створено. Увійдіть вручну.');
      }
    } catch (err) {
      setError('Помилка реєстрації. Ім’я зайняте або дані некоректні.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Реєстрація</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <input name="username" onChange={handleChange} placeholder="Ім'я користувача" required /><br />
      <input name="email" type="email" onChange={handleChange} placeholder="Email" required /><br />
      <input name="password" type="password" onChange={handleChange} placeholder="Пароль" required /><br />
      <select name="role" onChange={handleChange}>
        <option value="student">Учень</option>
        <option value="teacher">Вчитель</option>
        <option value="parent">Батьки</option>
      </select><br />
      <button type="submit">Зареєструватися</button>
    </form>
  );
}

export default RegisterForm;