// reducers/dialogReducer.js
export const DialogReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_DIALOG":
      return {
        ...state,
        isOpen: true,
        dialogType: action.payload.dialogType,
        dialogData: action.payload.data,
      };
    case "CLOSE_DIALOG":
      return {
        ...state,
        isOpen: false,
        dialogType: null,
        dialogData: null,
      };
    default:
      return state;
  }
};
