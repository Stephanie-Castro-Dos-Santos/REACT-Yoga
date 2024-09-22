export const CalendarReducer = (state, action) => {
  switch (action.type) {
    case "SET_CALENDAR_ID":
      return { ...state, calendarId: action.payload };
    case "SET_EVENTS":
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

// Helper function to normalize event object
const normalizeEvent = (event) => ({
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
  allDay: event.isAllDay || false,
  _id: event._id,
});
