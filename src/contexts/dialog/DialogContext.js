import { createContext } from "react";

export const DialogContext = createContext({
  isDialogOpen: false,
  selectedDate: null,
  selectedTime: null,
  openDialog: () => {},
  closeDialog: () => {},
});
