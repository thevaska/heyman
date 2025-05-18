import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function GradesList({ token }) {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState('');
  const [filterText, setFilterText] = useState('');
  const { id } = useParams();  // userId

  useEffect(() => {
    const url = id
      ? `http://127.0.0.1:8000/api/grades/?student=${id}`
      : 'http://127.0.0.1:8000/api/grades/';

    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setGrades(res.data);
    }).catch(() => {
      setError('Не вдалося завантажити оцінки');
    });
  }, [token, id]);

  const filteredGrades = grades.filter(g =>
    g.task.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <h3>📋 Оцінки {id ? `(учень ID ${id})` : ''}</h3>
      <input
        type="text"
        placeholder="Пошук за назвою завдання"
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Завдання</th>
            <th>Оцінка</th>
            <th>Дата</th>
            <th>Виставив</th>
          </tr>
        </thead>
        <tbody>
          {filteredGrades.map((grade) => (
            <tr key={grade.id}>
              <td>{grade.task}</td>
              <td>{grade.value}</td>
              <td>{new Date(grade.date).toLocaleString()}</td>
              <td>{grade.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GradesList;