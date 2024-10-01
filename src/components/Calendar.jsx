// Calendar.js
import React, { useContext, useMemo, useEffect } from "react";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { DialogResume } from "./DialogResume";
import { DialogOperation } from "./DialogOperation";
import { useCalendar, useFilter } from "../hooks/index";
import { CalendarContext, DialogContext } from "../contexts/index";

const localizer = dayjsLocalizer(dayjs);

const Calendar = () => {
  const { events, calendarId, loadData, setCalendarId, setEvents } =
    useContext(CalendarContext);
  const { isOpen, dialogType, dialogData, closeDialog } =
    useContext(DialogContext);
  const { handleSelectSlot, handleSelectEvent } = useCalendar();

  useEffect(() => {
    loadData(); // Cargar eventos
  }, [loadData]); // Añade dependencias si es necesario

  const filteredEvents = useFilter(events);
  // console.log(events);
  //console.log(filteredEvents);

  const calendarProps = useMemo(
    () => ({
      id: calendarId,
      localizer,
      events: filteredEvents,
      selectable: true,
      onSelectSlot: handleSelectSlot,
      onSelectEvent: handleSelectEvent,
    }),
    [calendarId, filteredEvents, handleSelectSlot, handleSelectEvent]
  );

  return (
    <div style={{ height: "95vh", width: "70vw" }}>
      <BigCalendar {...calendarProps} />
      {isOpen && dialogType === "resume" && (
        <DialogResume onClose={closeDialog} data={dialogData} />
      )}

      {isOpen && dialogType === "operation" && (
        <DialogOperation onClose={closeDialog} data={dialogData} />
      )}
    </div>
  );
};

export default Calendar;
