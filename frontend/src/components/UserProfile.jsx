import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile({ token }) {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    bio: '',
    avatar: null
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/users/me/', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setProfile({
        ...res.data,
        avatar: null // не відображати файл
      });
      if (res.data.avatar) {
        setAvatarPreview(res.data.avatar);
      }
    }).catch(() => {
      setError('Не вдалося завантажити профіль');
    });
  }, [token]);

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setProfile(prev => ({ ...prev, avatar: file }));
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const formData = new FormData();
    formData.append('first_name', profile.first_name);
    formData.append('last_name', profile.last_name);
    formData.append('bio', profile.bio);
    if (profile.avatar) {
      formData.append('avatar', profile.avatar);
    }

    try {
      await axios.put('http://127.0.0.1:8000/api/users/me/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setStatus('Профіль оновлено');
    } catch {
      setError('Помилка при оновленні профілю');
    }
  };

  return (
    <div>
      <h3>👤 Профіль користувача</h3>
      {status && <p style={{ color: 'green' }}>{status}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="first_name" placeholder="Ім’я" value={profile.first_name} onChange={handleChange} /><br />
        <input name="last_name" placeholder="Прізвище" value={profile.last_name} onChange={handleChange} /><br />
        <textarea name="bio" placeholder="Про себе" value={profile.bio} onChange={handleChange} /><br />
        <input type="file" onChange={handleFileChange} /><br />
        {avatarPreview && <img src={avatarPreview} alt="Аватар" width="100" />}<br />
        <button type="submit">Зберегти</button>
      </form>
    </div>
  );
}

export default UserProfile;