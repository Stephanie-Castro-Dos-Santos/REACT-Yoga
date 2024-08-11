// hooks/useCalendar.js
import { useCallback, useContext, useRef } from "react";
import { DialogContext } from "../contexts/dialog/DialogContext";

export const useCalendar = () => {
  const { openDialog } = useContext(DialogContext);
  const clickRef = useRef(null);

  const handleSelectSlot = useCallback(
    (slotInfo) => {
      // Debounce the click action
      window.clearTimeout(clickRef.current);
      clickRef.current = window.setTimeout(() => {
        openDialog(slotInfo.start, slotInfo.end); // Pass both start and end dates to openDialog
      }, 250);
    },
    [openDialog]
  );

  return {
    handleSelectSlot,
  };
};
