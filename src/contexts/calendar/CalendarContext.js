import { createContext } from "react";

// Contexto inicial para el calendario
export const CalendarContext = createContext({
  calendarId: null,
  events: [],
  setCalendarId: () => {},
  setEvents: () => {},
});
