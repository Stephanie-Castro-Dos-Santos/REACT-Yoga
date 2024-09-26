// CalendarContext.js
import { createContext } from "react";

// Contexto inicial para el calendario
export const CalendarContext = createContext({
  calendarId: null, // ID del calendario asociado al usuario
  roleType: "public",
  events: [], // Lista de eventos
  selectedEvent: null, // Evento seleccionado actualmente
  setCalendarId: () => {}, // Función para establecer el ID del calendario
  setEvents: () => {}, // Función para establecer la lista de eventos
  setRoleType: () => {},
  addEvent: () => {}, // Función para añadir un nuevo evento
  updateEvent: () => {}, // Función para actualizar un evento existente
  removeEvent: () => {}, // Función para eliminar un evento
  selectEvent: () => {}, // Función para seleccionar un evento
  clearSelectedEvent: () => {}, // Función para limpiar el evento seleccionado
});
