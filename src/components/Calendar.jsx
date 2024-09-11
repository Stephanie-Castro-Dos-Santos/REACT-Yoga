import React, { useContext, useEffect, useState } from "react";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { Dialog } from "./Dialog";
import { useCalendar } from "../hooks/useCalendar";
import axios from "axios";
import { CalendarContext, FilterContext } from "../contexts/index";

const localizer = dayjsLocalizer(dayjs);

const Calendar = () => {
  const { handleSelectSlot, handleSelectEvent } = useCalendar();

  // Calendar Context
  const { calendarId, setCalendarId, setEvents, events } =
    useContext(CalendarContext);

  // Filter Context
  const { filters } = useContext(FilterContext); // Recupera los filtros del contexto
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        setLoading(true); // Indica que la carga ha comenzado

        // Envía los filtros como parámetros query
        const response = await axios.get("http://localhost:3000/api/events", {
          params: filters, // Los filtros vienen del contexto
          withCredentials: true,
        });

        const { calendar, events } = response.data;
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
        setLoading(false); // Indica que la carga ha terminado
      } catch (error) {
        console.error("Error al cargar eventos:", error);
        setLoading(false); // Asegúrate de que la carga se detenga también en caso de error
      }
    };

    fetchCalendar();
  }, [filters]); // Solo depende de los filtros

  // if (loading) {
  //   return <div>Loading...</div>; // Muestra un mensaje de carga mientras los datos se están recuperando
  // }

  return (
    <div style={{ height: "95vh", width: "70vw" }}>
      <Dialog />
      <BigCalendar
        id={calendarId}
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
