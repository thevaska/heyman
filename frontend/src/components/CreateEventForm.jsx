import React, { useState } from 'react';
import axios from 'axios';

function CreateEventForm({ token, onEventCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    participants: ''
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'participants') {
        const ids = value.split(',').map(v => v.trim()).filter(v => v);
        ids.forEach(id => data.append('participants', id));
      } else {
        data.append(key, value);
      }
    });

    if (file) {
      data.append('attachment', file);
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/events/', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setFormData({ title: '', description: '', start_time: '', end_time: '', participants: '' });
      setFile(null);
      onEventCreated();
    } catch (err) {
      setError('Помилка створення події');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Створити подію</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="title" placeholder="Назва" value={formData.title} onChange={handleChange} required /><br />
      <textarea name="description" placeholder="Опис" value={formData.description} onChange={handleChange}></textarea><br />
      <input name="start_time" type="datetime-local" value={formData.start_time} onChange={handleChange} required /><br />
      <input name="end_time" type="datetime-local" value={formData.end_time} onChange={handleChange} required /><br />
      <input name="participants" placeholder="ID учасників через кому" value={formData.participants} onChange={handleChange} /><br />
      <input type="file" onChange={handleFileChange} /><br />
      <button type="submit">Додати подію</button>
    </form>
  );
}

export default CreateEventForm;