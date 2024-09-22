import { createContext } from "react";

export const DialogContext = createContext({
  isOpen: false,
  dialogType: null,
  dialogData: null,
  openDialog: () => {},
  closeDialog: () => {},
});
