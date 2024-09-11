// CalendarProvider.jsx
import React, { useReducer } from "react";
import { CalendarContext } from "./CalendarContext";
import { CalendarReducer } from "./CalendarReducer";

const initialState = {
  calendarId: null,
  events: [],
};

export const CalendarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CalendarReducer, initialState);

  const setCalendarId = (calendarId) => {
    dispatch({ type: "SET_CALENDAR_ID", payload: calendarId });
  };

  const setEvents = (events) => {
    dispatch({ type: "SET_EVENTS", payload: events });
  };

  return (
    <CalendarContext.Provider
      value={{
        calendarId: state.calendarId,
        eventsId: state.eventsId,
        events: state.events,
        setCalendarId,
        setEvents,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
