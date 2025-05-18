import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Calendar({ token }) {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/events/', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const formatted = res.data.map(event => ({
        id: event.id,
        title: event.title,
        start: event.start_time,
        end: event.end_time,
        description: event.description,
        attachment: event.attachment
      }));
      setEvents(formatted);
    });
  }, [token]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        start: 'prev,next today',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      events={events}
      eventClick={(info) => {
        const id = info.event.id;
        navigate(`/event/${id}`);
      }}
      height="auto"
    />
  );
}

export default Calendar;