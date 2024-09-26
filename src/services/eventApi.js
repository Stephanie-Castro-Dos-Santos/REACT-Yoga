import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchEvents = async (roleType) => {
  console.log(roleType);
  const response = await axios.get(`${API_URL}/events`, {
    params: { roleType }, // Enviamos roleType como query parameter
    withCredentials: true, // Asegura que las cookies de la sesión se envíen con la solicitud
  });
  console.log(response.data);
  return response.data;
};

export const createEvent = async (event) => {
  const response = await axios.post(`${API_URL}/events`, event);

  return response.data;
};

export const updateEvent = async (event) => {
  const response = await axios.patch(`${API_URL}/events/${event.id}`, event);
  return response.data;
};

export const deleteEvent = async (eventId) => {
  await axios.delete(`${API_URL}/events/${eventId}`);
};
