import React, { useState } from 'react';
import axios from 'axios';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/users/reset_password/', { email });
      setStatus('Інструкції для скидання надіслано (якщо email існує)');
    } catch (err) {
      setError('Помилка при скиданні пароля');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>🔑 Забули пароль?</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {status && <p style={{ color: 'green' }}>{status}</p>}
      <input
        type="email"
        placeholder="Введіть email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      /><br />
      <button type="submit">Скинути пароль</button>
    </form>
  );
}

export default ForgotPasswordForm;