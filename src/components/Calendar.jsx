// Calendar.jsx
import React, { useContext, useEffect, useState } from "react";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { Dialog } from "./Dialog";
import { useCalendar } from "../hooks/useCalendar";
import axios from "axios";
import { CalendarContext } from "../contexts/index"; // Importa el contexto

const localizer = dayjsLocalizer(dayjs);

const Calendar = () => {
  const { handleSelectSlot, handleSelectEvent } = useCalendar();
  const { calendarId, setCalendarId, setEvents, events } =
    useContext(CalendarContext); // Utiliza el contexto
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/events", {
          withCredentials: true,
        });

        const { calendar, events } = response.data; // Asegúrate de que calendar y events sean correctos
        const calendarId = calendar._id;
        const eventsCalendar = events.map((event) => ({
          id: event._id,
          title: event.title,
          start: new Date(event.startDate),
          end: new Date(event.endDate),
          allDay: event.isAllDay || false,
        }));

        setCalendarId(calendarId);
        setEvents(eventsCalendar);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar eventos:", error);
      }
    };

    fetchCalendar();
  }, [setCalendarId, setEvents]);

  if (loading) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras los datos se están recuperando
  }

  return (
    <div style={{ height: "95vh", width: "70vw" }}>
      <Dialog />
      <BigCalendar
        id={calendarId}
        defaultDate={new Date()}
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default Calendar;
