// providers/DialogProvider.jsx
import React, { useReducer } from "react";
import { DialogContext } from "./DialogContext";
import { DialogReducer } from "./DialogReducer";

const INITIAL_STATE = {
  isDialogOpen: false,
  selectedStartDate: null,
  selectedEndDate: null,
};

export const DialogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DialogReducer, INITIAL_STATE);

  const openDialog = (startDate, endDate) => {
    dispatch({ type: "OPEN_DIALOG", payload: { startDate, endDate } });
  };

  const closeDialog = () => {
    dispatch({ type: "CLOSE_DIALOG" });
  };

  return (
    <DialogContext.Provider
      value={{
        ...state,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
