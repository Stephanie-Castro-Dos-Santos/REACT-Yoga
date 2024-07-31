import React, { useRef, useState } from "react";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import axios from "axios";

const CalendarComponent = () => {
  const calendarRef = useRef(null);
  const [schedules, setSchedules] = useState([]);
  const [calendars, setCalendars] = useState([
    {
      id: "1",
      name: "My Calendar",
      bgColor: "#9e5fff",
      borderColor: "#9e5fff",
    },
  ]);

  const handleBeforeCreateSchedule = (event) => {
    const { calendarId, title, start, end, isAllDay } = event;
    const newSchedule = {
      id: String(schedules.length + 1),
      calendarId,
      title,
      category: isAllDay ? "allday" : "time",
      dueDateClass: "",
      start,
      end,
    };
    setSchedules([...schedules, newSchedule]);
  };

  const handleBeforeDeleteSchedule = (event) => {
    const { id } = event.schedule;
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const handleBeforeUpdateSchedule = (event) => {
    const { schedule, changes } = event;
    setSchedules(
      schedules.map((s) => (s.id === schedule.id ? { ...s, ...changes } : s))
    );
  };

  const addEvent = () => {
    const calendarInstance = calendarRef.current.getInstance();
    calendarInstance.createEvents([
      {
        id: String(schedules.length + 1),
        calendarId: "1",
        title: "New Event",
        category: "time",
        dueDateClass: "",
        start: new Date(),
        end: new Date(new Date().getTime() + 3600000),
      },
    ]);
  };

  const deleteEvent = (id) => {
    const calendarInstance = calendarRef.current.getInstance();
    calendarInstance.deleteEvent(id, "1");
  };

  return (
    <div>
      <button onClick={addEvent}>Add Event</button>
      <Calendar
        ref={calendarRef}
        height="900px"
        view="week"
        useCreationPopup={true}
        useDetailPopup={true}
        schedules={schedules}
        calendars={calendars}
        onBeforeCreateSchedule={handleBeforeCreateSchedule}
        onBeforeDeleteSchedule={handleBeforeDeleteSchedule}
        onBeforeUpdateSchedule={handleBeforeUpdateSchedule}
      />
    </div>
  );
};

export default CalendarComponent;
