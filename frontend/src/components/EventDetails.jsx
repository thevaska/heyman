import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/events/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setEvent(res.data);
    }).catch(err => {
      setError('Не вдалося завантажити подію');
    });
  }, [id, token]);

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Назад</button>
      <h2>Подія</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {event && (
        <div>
          <h3>{event.title}</h3>
          <p><strong>Опис:</strong> {event.description || 'Немає'}</p>
          <p><strong>Початок:</strong> {event.start_time}</p>
          <p><strong>Кінець:</strong> {event.end_time}</p>
          {event.attachment && (
            <p>
              📎 <a href={event.attachment} target="_blank" rel="noopener noreferrer">Скачати файл</a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default EventDetails;