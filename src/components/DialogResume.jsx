import React, { useContext } from "react";
import { DialogBase } from "./DialogBase";
import { useNavigate } from "react-router-dom";
import { CalendarContext, DialogContext, AuthContext } from "../contexts/index";

export const DialogResume = ({ onClose, data }) => {
  const { removeEvent, roleType } = useContext(CalendarContext);
  const { openDialog } = useContext(DialogContext);
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleReservation = () => {
    // Comprobar si el usuario está logueado y es alumno
    if (!role || role !== "student") {
      // Redirigir al login
      navigate("/auth");
    } else {
      // Lógica para reservar la clase
      // Por ejemplo: reservarClase(data.id);
    }
  };

  //console.log(data);

  const handleEdit = () => {
    onClose();
    openDialog("operation", { ...data, dialogMode: "EDIT" });
  };

  const handleDelete = async () => {
    await removeEvent(data.id);
    onClose();
  };

  const renderActionButtons = () => {
    const buttons = []; // Array para almacenar los botones

    if (roleType === "public") {
      if (role === "teacher") {
        // No se puede hacer nada para el teacher
        return buttons; // Regresar solo los botones que se definieron más abajo
      } else if (role === "student") {
        buttons.push(
          <button key="reserve" onClick={handleReservation}>
            Reservar Clase
          </button>
        );
      }
    } else if (roleType === "teacher" && role === "teacher") {
      buttons.push(
        <button key="edit" onClick={handleEdit}>
          Edit
        </button>
      );
      buttons.push(
        <button key="delete" onClick={handleDelete}>
          Delete
        </button>
      );
    } else if (roleType === "student" && role === "student") {
      buttons.push(
        <button key="unsubscribe" onClick={handleUnsubscribe}>
          Desapuntarte
        </button>
      );
    }

    buttons.push(
      <button key="close" onClick={onClose}>
        Close
      </button>
    ); // El botón Close se agrega siempre

    return buttons; // Devolver todos los botones
  };

  return (
    <DialogBase isOpen={true} onClose={onClose}>
      <h2>{data.title}</h2>
      <p>Start: {new Date(data.start).toLocaleString()}</p>
      <p>End: {new Date(data.end).toLocaleString()}</p>
      <p>Type: {data.typeYoga}</p>
      <p>Mode: {data.mode}</p>
      <p>Participants: {data.participants}</p>
      <p>Description: {data.description}</p>

      {renderActionButtons()}
    </DialogBase>
  );
};
