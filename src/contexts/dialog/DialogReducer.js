// reducers/dialogReducer.js
export const DialogReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_DIALOG":
      return {
        ...state,
        isDialogOpen: true,
        selectedStartDate: action.payload.startDate,
        selectedEndDate: action.payload.endDate || null,
        selectedStartTime: action.payload.startTime,
        selectedEndTime: action.payload.endTime || null,
      };
    case "CLOSE_DIALOG":
      return {
        ...state,
        isDialogOpen: false,
        selectedStartDate: null,
        selectedEndDate: null,
        selectedStartTime: null,
        selectedEndTime: null,
      };
    default:
      return state;
  }
};
