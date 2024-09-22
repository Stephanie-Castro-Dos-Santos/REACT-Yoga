import React, { useContext } from "react";
import { DialogBase } from "./DialogBase";
import { CalendarContext, DialogContext, AuthContext } from "../contexts/index";

export const DialogResume = ({ onClose, data }) => {
  const { removeEvent } = useContext(CalendarContext);
  const { openDialog } = useContext(DialogContext);
  const { role } = useContext(AuthContext);

  //console.log(data);

  const handleEdit = () => {
    onClose();
    openDialog("operation", { ...data, dialogMode: "EDIT" });
  };

  const handleDelete = async () => {
    await removeEvent(data.id);
    onClose();
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
      {role == "teacher" ? (
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : (
        <button>Reservar Clase</button>
      )}
    </DialogBase>
  );
};
