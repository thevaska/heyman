import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChildrenList({ token }) {
  const [children, setChildren] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/children/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setChildren(res.data);
    }).catch(() => {
      setError('Не вдалося завантажити список дітей');
    });
  }, [token]);

  return (
    <div>
      <h3>👨‍👩‍👧‍👦 Мої діти</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {children.map(child => (
          <li key={child.id}>
            {child.first_name} {child.last_name} ({child.username}) — {child.role}
            <button onClick={() => navigate(`/grades/${child.id}`)}>Оцінки</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChildrenList;