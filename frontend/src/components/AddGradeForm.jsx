import React, { useState } from 'react';
import axios from 'axios';

function AddGradeForm({ token, onGradeAdded }) {
  const [formData, setFormData] = useState({
    task: '',
    student: '',
    value: ''
  });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setStatus('');
    try {
      await axios.post('http://127.0.0.1:8000/api/grades/', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStatus('Оцінку додано успішно');
      setFormData({ task: '', student: '', value: '' });
      onGradeAdded();
    } catch {
      setError('Помилка при додаванні оцінки');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>➕ Додати оцінку</h4>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {status && <p style={{ color: 'green' }}>{status}</p>}
      <input name="task" placeholder="ID завдання" value={formData.task} onChange={handleChange} required /><br />
      <input name="student" placeholder="ID учня" value={formData.student} onChange={handleChange} required /><br />
      <input name="value" placeholder="Оцінка (наприклад, 10)" value={formData.value} onChange={handleChange} required /><br />
      <button type="submit">Зберегти</button>
    </form>
  );
}

export default AddGradeForm;