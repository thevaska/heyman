import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function ResetPasswordConfirmForm() {
  const [searchParams] = useSearchParams();
  const [uid, setUid] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const uidParam = searchParams.get('uid');
    const tokenParam = searchParams.get('token');
    if (uidParam) setUid(uidParam);
    if (tokenParam) setToken(tokenParam);
  }, [searchParams]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/users/reset_password_confirm/', {
        uid,
        token,
        new_password: newPassword
      });
      setStatus('Пароль змінено успішно!');
    } catch (err) {
      setError('Помилка підтвердження. Перевірте токен, uid або пароль');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>🔐 Встановити новий пароль</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {status && <p style={{ color: 'green' }}>{status}</p>}
      <input placeholder="UID" value={uid} onChange={e => setUid(e.target.value)} required /><br />
      <input placeholder="Token" value={token} onChange={e => setToken(e.target.value)} required /><br />
      <input
        type="password"
        placeholder="Новий пароль"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        required
      /><br />
      <button type="submit">Підтвердити зміну</button>
    </form>
  );
}

export default ResetPasswordConfirmForm;