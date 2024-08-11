// hooks/useDialog.js
import { useRef, useContext } from "react";
import { DialogContext } from "../contexts/index";

export const useDialog = () => {
  const dialogRef = useRef(null);
  const { isDialogOpen, openDialog, closeDialog } = useContext(DialogContext);

  const toggleDialog = () => {
    if (!dialogRef.current) return;

    if (isDialogOpen) {
      closeDialog();
      dialogRef.current.close();
    } else {
      openDialog();
      dialogRef.current.showModal();
    }
  };

  const closeOutside = (e) => {
    if (e.currentTarget === e.target) {
      toggleDialog();
    }
  };

  return { dialogRef, toggleDialog, closeOutside };
};
