import { createContext } from "react";

// Contexto inicial para el calendario
export const CalendarContext = createContext({
  calendarId: null,
  eventsId: [],
  events: [],
  setCalendarId: () => {},
  setEvents: () => {},
});
