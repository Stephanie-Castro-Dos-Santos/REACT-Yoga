import { createContext } from "react";

export const DialogContext = createContext({
  isDialogOpen: false,
  selectedDate: null,
  openDialog: () => {},
  closeDialog: () => {},
});
