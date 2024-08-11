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

  return (
    <div style={{ height: "95vh", width: "95vw" }}>
      <Dialog />
      <BigCalendar
        defaultDate={new Date()}
        localizer={localizer}
        selectable
        onSelectSlot={handleSelectSlot} // Attach the handler
      />
    </div>
  );
};

export default Calendar;
