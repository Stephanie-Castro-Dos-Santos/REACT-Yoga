// hooks/useCalendar.js
import { useCallback, useContext, useRef } from "react";
import { DialogContext } from "../contexts/dialog/DialogContext";
import dayjs from "dayjs";

export const useCalendar = () => {
  const { openDialog } = useContext(DialogContext);
  const clickRef = useRef(null);

  const handleSelectSlot = useCallback(
    (slotInfo) => {
      // Debounce the click action
      window.clearTimeout(clickRef.current);
      clickRef.current = window.setTimeout(() => {
        const startDate = slotInfo.start;
        const endDate = slotInfo.end;

        // Utiliza dayjs para formatear la hora de inicio y fin
        const startTime = dayjs(startDate).format("HH:mm");
        const endTime = dayjs(endDate).format("HH:mm");

        // Pasar las fechas y horas a openDialog
        openDialog(startDate, endDate, startTime, endTime);
      }, 250);
    },
    [openDialog]
  );

  return {
    handleSelectSlot,
  };
};
