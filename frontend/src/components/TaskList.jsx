import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const role = localStorage.getItem('role');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tasks/', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setTasks(res.data);
    }).catch(() => {
      setError('Не вдалося завантажити завдання');
    });
  }, [token]);

  const toggleStatus = async (task) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
        is_completed: !task.is_completed
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, is_completed: !t.is_completed } : t));
    } catch {
      alert('Помилка при оновленні статусу');
    }
  };

  return (
    <div>
      <h3>📌 Завдання</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong> — {task.is_completed ? '✅ Виконано' : '❌ Не виконано'}
            {role === 'teacher' && (
              <button onClick={() => toggleStatus(task)} style={{ marginLeft: '10px' }}>
                Змінити статус
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;