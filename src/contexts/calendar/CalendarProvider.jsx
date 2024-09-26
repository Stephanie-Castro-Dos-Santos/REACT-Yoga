import React, { useReducer, useEffect, useCallback } from "react";
import { CalendarContext } from "./CalendarContext";
import { CalendarReducer } from "./CalendarReducer";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../services/eventApi";

const initialState = {
  calendarId: null,
  roleType: "public",
  events: [],
  selectedEvent: null,
};

export const CalendarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CalendarReducer, initialState);

  const setCalendarId = useCallback((calendarId) => {
    dispatch({ type: "SET_CALENDAR_ID", payload: calendarId });
  }, []);

  const setRoleType = useCallback((roleType) => {
    dispatch({ type: "SET_ROLE_TYPE", payload: roleType });
  }, []);

  const setEvents = useCallback((events) => {
    dispatch({ type: "SET_EVENTS", payload: events });
  }, []);

  const loadData = useCallback(async () => {
    try {
      // Asegúrate de que roleType no sea null
      if (!state.roleType) {
        console.error("roleType no está definido");
        return;
      }

      const data = await fetchEvents(state.roleType);

      if (data && data.calendar) {
        setCalendarId(data.calendar._id);

        const events = data.calendar.events.map((event) => ({
          id: event._id,
          calendarId: event.calendarId,
          teacherId: event.teacherId,
          centerId: event.centerId,
          title: event.title,
          start: new Date(event.startDate),
          end: new Date(event.endDate),
          mode: event.mode,
          typeYoga: event.typeYoga,
          address: {
            location: event.addressId?.location,
            coordinates: event.addressId?.coordinates,
          },
          link: event.link,
          description: event.description,
          participants: event.participants,
          allDay: event.isAllDay || false,
          _id: event._id,
        }));

        setEvents(events);
      } else {
        console.error("Formato de datos incorrecto:", data);
      }
    } catch (error) {
      console.error("Error al cargar los eventos:", error);
    }
  }, [setCalendarId, setEvents, state.roleType]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addEvent = useCallback(async (event) => {
    try {
      const newEvent = await createEvent(event);
      dispatch({ type: "ADD_EVENT", payload: newEvent });
    } catch (error) {
      console.error("Error creando evento:", error);
    }
  }, []);

  const editEvent = useCallback(async (event) => {
    try {
      const updatedEvent = await updateEvent(event);
      dispatch({ type: "UPDATE_EVENT", payload: updatedEvent });
    } catch (error) {
      console.error("Error actualizando evento:", error);
    }
  }, []);

  const removeEvent = useCallback(async (eventId) => {
    try {
      await deleteEvent(eventId);
      dispatch({ type: "DELETE_EVENT", payload: eventId });
    } catch (error) {
      console.error(
        "Error eliminando evento:",
        error.response ? error.response.data : error.message
      );
    }
  }, []);

  const selectEvent = useCallback((event) => {
    dispatch({ type: "SELECT_EVENT", payload: event });
  }, []);

  const clearSelectedEvent = useCallback(() => {
    dispatch({ type: "CLEAR_SELECTED_EVENT" });
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        ...state,
        loadData,
        setCalendarId,
        setRoleType,
        setEvents,
        addEvent,
        editEvent,
        removeEvent,
        selectEvent,
        clearSelectedEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
