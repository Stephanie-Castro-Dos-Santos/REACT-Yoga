// providers/DialogProvider.jsx
import React, { useReducer } from "react";
import { DialogContext } from "./DialogContext";
import { DialogReducer } from "./DialogReducer";

const INITIAL_STATE = {
  isOpen: false,
  dialogType: null,
  dialogData: null,
};

export const DialogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DialogReducer, INITIAL_STATE);

  const openDialog = (dialogType, data) => {
    dispatch({ type: "OPEN_DIALOG", payload: { dialogType, data } });
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
