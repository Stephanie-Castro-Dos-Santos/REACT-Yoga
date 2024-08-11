// components/Dialog.js
import React, { useContext, useEffect } from "react";
import { useDialog } from "../hooks/useDialog"; // Ensure this path is correct
import { DialogContext } from "../contexts/dialog/DialogContext";

export const Dialog = () => {
  const { dialogRef, toggleDialog, closeOutside } = useDialog();
  const { isDialogOpen, selectedStartDate, selectedEndDate } =
    useContext(DialogContext); // Use context to get dates

  useEffect(() => {
    if (dialogRef.current) {
      isDialogOpen ? dialogRef.current.showModal() : dialogRef.current.close();
    }
  }, [isDialogOpen, dialogRef]);

  return (
    <dialog ref={dialogRef} onClick={closeOutside}>
      <div>
        {isDialogOpen ? (
          <p>{`Selected dates: ${selectedStartDate.toLocaleString()} - ${
            selectedEndDate
              ? selectedEndDate.toLocaleString()
              : "No end date selected"
          }`}</p>
        ) : (
          <p>No date selected</p>
        )}
        <button onClick={toggleDialog}>Close</button>
      </div>
    </dialog>
  );
};
