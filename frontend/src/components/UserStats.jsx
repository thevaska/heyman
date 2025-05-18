import React, { useState } from 'react';
import axios from 'axios';

function UserStats({ token }) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/stats/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
    } catch (err) {
      setError('Помилка отримання статистики');
    }
  };

  return (
    <div>
      <h3>📊 Статистика користувача</h3>
      <button onClick={fetchStats}>Оновити</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {stats && (
        <ul>
          <li>Створено подій: {stats.events_created}</li>
          <li>Усього завдань: {stats.tasks_total}</li>
          <li>Виконано: {stats.completed_tasks}</li>
          <li>Не виконано: {stats.incomplete_tasks}</li>
          <li>Сер. завдань на подію: {stats.avg_tasks_per_event}</li>
        </ul>
      )}
    </div>
  );
}

export default UserStats;