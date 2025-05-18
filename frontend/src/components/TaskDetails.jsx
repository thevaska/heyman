import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setTask(res.data);
    }).catch(() => {
      setError('Не вдалося завантажити завдання');
    });
  }, [id, token]);

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Назад</button>
      <h2>Завдання</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {task && (
        <div>
          <h3>{task.title}</h3>
          <p><strong>Опис:</strong> {task.description || 'Немає'}</p>
          <p><strong>Статус:</strong> {task.is_completed ? '✅ Виконано' : '❌ Не виконано'}</p>
          {task.related_event && (
            <p>🔗 Пов'язано з подією: {task.related_event}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskDetails;