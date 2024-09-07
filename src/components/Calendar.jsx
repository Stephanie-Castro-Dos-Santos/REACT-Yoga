// components/Calendar.js
import React from "react";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { Dialog } from "./Dialog";
import { useCalendar } from "../hooks/useCalendar"; // Use the custom hook

const localizer = dayjsLocalizer(dayjs);

const Calendar = () => {
  const { handleSelectSlot } = useCalendar();
  const events = [
    {
      id: 0,
      title: "All Day Event very long title",
      allDay: true,
      start: new Date(),
      end: new Date(),
    },
    {
      id: 1,
      title: "Long Event",
      start: new Date(2024, 8, 11),
      end: new Date(2024, 8, 13),
    },
  ];

  return (
    <div style={{ height: "95vh", width: "70vw" }}>
      <Dialog />
      <BigCalendar
        defaultDate={new Date()}
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSelectSlot} // Attach the handler
      />
    </div>
  );
};

export default Calendar;
