import dayjs from "dayjs";

export const CalendarReducer = (state, action) => {
  switch (action.type) {
    case "SET_CALENDAR_ID":
      return { ...state, calendarId: action.payload };
    case "SET_ROLE_TYPE": // Nuevo caso
      return { ...state, roleType: action.payload };
    case "SET_EVENTS":
      console.log("SET EVENTS: ");
      console.log(action.payload);
      return { ...state, events: action.payload };
    case "ADD_EVENT":
      console.log("Adding event:", action.payload);
      return {
        ...state,
        events: [...state.events, normalizeEvent(action.payload)],
      };
    case "UPDATE_EVENT":
      console.log("Updating event:", action.payload);
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload._id
            ? normalizeEvent(action.payload)
            : event
        ),
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => event._id !== action.payload),
      };
    case "SELECT_EVENT":
      return { ...state, selectedEvent: action.payload };
    case "CLEAR_SELECTED_EVENT":
      return { ...state, selectedEvent: null };
    default:
      return state;
  }
};

const normalizeEvent = (event) => {
  console.log("Normalizing event:", event); // Add this line for debugging
  return {
    id: event._id,
    calendarId: event.calendarId,
    teacherId: event.teacherId,
    centerId: event.centerId,
    title: event.title,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    mode: event.mode,
    typeYoga: event.typeYoga,
    description: event.description,
    participants: event.participants,
    link: event.link,
    address: event.addressId
      ? {
          location: event.addressId?.location,
          coordinates: event.addressId?.coordinates,
        }
      : null,
    allDay: event.isAllDay || false,
    _id: event._id,
  };
};

// start: dayjs(event.startDate).format("YYYY-MM-DDTHH:mm"),
// end: dayjs(event.endDate).format("YYYY-MM-DDTHH:mm"),
