// CalendarProvider.jsx
import React, { useReducer } from "react";
import { CalendarContext } from "./CalendarContext";
import { CalendarReducer } from "./CalendarReducer";

const initialState = {
  calendarId: null,
  eventsId: [],
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

  const setEventsId = (eventsId) => {
    dispatch({ type: "SET_EVENTS_ID", payload: eventsId });
  };

  return (
    <CalendarContext.Provider
      value={{
        calendarId: state.calendarId,
        eventsId: state.eventsId,
        events: state.events,
        setCalendarId,
        setEvents,
        setEventsId,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
