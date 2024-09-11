// hooks/useCalendar.js
import { useCallback, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DialogContext, AuthContext } from "../contexts/index";
import dayjs from "dayjs";

export const useCalendar = () => {
  const { openDialog } = useContext(DialogContext);
  const { isAuthenticated } = useContext(AuthContext); // Mueve useContext aquí
  const navigate = useNavigate(); // Mueve useNavigate aquí
  const clickRef = useRef(null);

  const handleSelectSlot = useCallback(
    (slotInfo) => {
      if (!isAuthenticated) {
        navigate("/auth");
      }
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
      }, 200);
    },
    [openDialog]
  );

  // Maneja el clic en un evento existente
  const handleSelectEvent = useCallback(
    (event) => {
      // Debounce la acción de clic en el evento
      window.clearTimeout(clickRef.current);
      clickRef.current = window.setTimeout(() => {
        // Llamar a openDialogForEditing con los detalles del evento seleccionado
        openDialog(event);
      }, 250);
    },
    [openDialog]
  );

  return {
    handleSelectSlot,
    handleSelectEvent,
  };
};
