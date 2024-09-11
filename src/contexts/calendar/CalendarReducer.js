export const CalendarReducer = (state, action) => {
  switch (action.type) {
    case "SET_CALENDAR_ID":
      return { ...state, calendarId: action.payload };
    case "SET_EVENTS":
      return { ...state, events: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
