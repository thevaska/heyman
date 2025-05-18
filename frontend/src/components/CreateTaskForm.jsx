import React, { useState } from 'react';
import axios from 'axios';

function CreateTaskForm({ token, onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    related_event: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://127.0.0.1:8000/api/tasks/', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ title: '', description: '', related_event: '' });
      onTaskCreated();
    } catch (err) {
      setError('Помилка створення завдання');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Створити завдання</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="title" placeholder="Назва" value={formData.title} onChange={handleChange} required /><br />
      <textarea name="description" placeholder="Опис" value={formData.description} onChange={handleChange}></textarea><br />
      <input name="related_event" placeholder="ID події (не обов’язково)" value={formData.related_event} onChange={handleChange} /><br />
      <button type="submit">Додати</button>
    </form>
  );
}

export default CreateTaskForm;