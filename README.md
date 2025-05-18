# Star for Life School Platform

Проєкт для шкільного керування з ролями, профілями, подіями, завданнями, оцінками та статистикою.

## 📦 Структура

- `backend/` — Django сервер
- `frontend/` — React інтерфейс
- Ролі користувачів: student, teacher, parent

## ⚙️ Встановлення

### 1. Клонуйте репозиторій та перейдіть у проєкт

```bash
git clone <your_repo_url>
cd backend
```

### 2. Створіть віртуальне середовище та активуйте

```bash
python -m venv venv
source venv/bin/activate  # або venv\Scripts\activate для Windows
```

### 3. Встановіть залежності

```bash
pip install -r requirements.txt
```

### 4. Застосуйте міграції

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Запустіть сервер

```bash
python manage.py runserver
```

---

## 🚀 API Endpoints

- `POST /api/register/` — реєстрація
- `GET /api/me/` — профіль користувача
- `GET /api/stats/` — глобальна статистика
- `GET /api/events/` — події
- `GET /api/tasks/` — завдання
- `GET /api/grades/` — оцінки

---

## 👨‍👩‍👧‍👦 Ролі та доступ

| Роль    | Доступ                         |
|---------|--------------------------------|
| Учень   | Перегляд свого профілю, завдань, оцінок |
| Вчитель | Створення подій, завдань, виставлення оцінок |
| Батько  | Перегляд профілю/оцінок дитини |

---

## 📅 Функціонал

- Авторизація, реєстрація
- Ролі з обмеженим доступом
- Профіль з аватаром та біо
- Сторінка з оцінками
- Статистика (кількість користувачів, завдань, оцінок)
- Календар з подіями
- API з підтримкою JWT

---

## 🧪 Тестові користувачі

- Учень: `student1 / password`
- Вчитель: `teacher1 / password`
- Батько: `parent1 / password`

> Можна створити через admin панель або API.

---

## 📂 Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

## 📮 Контакт

Star For Life Tournament 2025 — Django + React система керування школою.
