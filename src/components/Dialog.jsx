// components/Dialog.js
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDialog } from "../hooks/useDialog"; // Asegúrate de que esta ruta sea correcta
import { DialogContext, AuthContext } from "../contexts/index";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import axios from "axios";

export const Dialog = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/auth");
  }
  const { dialogRef, toggleDialog, closeOutside } = useDialog();
  const {
    isDialogOpen,
    selectedStartDate,
    selectedEndDate,
    selectedStartTime,
    selectedEndTime,
  } = useContext(DialogContext);

  console.log(selectedStartDate);

  // Estados locales para manejar las fechas y horas seleccionadas
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState(1);
  const [teachers, setTeachers] = useState([]);
  const [centers, setCenters] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Usar useEffect para hacer la solicitud al backend al cargar el componente
  useEffect(() => {
    const fetchTeachersAndCenters = async () => {
      try {
        const [teachersResponse, centersResponse] = await Promise.all([
          axios.get("http://localhost:3000/api/teachers"),
          axios.get("http://localhost:3000/api/centers"),
        ]);

        console.log(teachersResponse);
        console.log(centersResponse);

        setTeachers(
          Array.isArray(teachersResponse.data) ? teachersResponse.data : []
        );
        setCenters(
          Array.isArray(centersResponse.data) ? centersResponse.data : []
        );
      } catch (error) {
        console.error("Error al cargar profesores o centros:", error);
      }
    };

    fetchTeachersAndCenters();
  }, []);

  useEffect(() => {
    if (dialogRef.current) {
      isDialogOpen ? dialogRef.current.showModal() : dialogRef.current.close();
    }
  }, [isDialogOpen, dialogRef]);

  useEffect(() => {
    // Inicializar los estados con los valores del contexto si están disponibles
    if (selectedStartDate) {
      setStartDate(dayjs(selectedStartDate).format("YYYY-MM-DD"));
    }
    if (selectedEndDate) {
      setEndDate(dayjs(selectedEndDate).format("YYYY-MM-DD"));
    }
    if (selectedStartTime) {
      setStartTime(selectedStartTime);
    }
    if (selectedEndTime) {
      setEndTime(selectedEndTime);
    }
  }, [selectedStartDate, selectedEndDate, selectedStartTime, selectedEndTime]);

  const today = dayjs().format("YYYY-MM-DD");

  return (
    <dialog ref={dialogRef} onClick={closeOutside}>
      <div>
        <form action="" method="post">
          {/* Title */}
          <input
            type="text"
            id="POST-titleEvent"
            name="POST-titleEvent"
            //onChange={(e) => setStartDate(e.target.value)}
            placeholder="Título"
            required
          />
          <br />
          <br />
          {/* Start Date */}
          <label htmlFor="POST-startDate">Fecha de Inicio:</label>
          <input
            type="date"
            id="POST-startDate"
            name="POST-startDate"
            min={today}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <br />
          <br />
          {/* End Date */}
          <label htmlFor="POST-endDate">Fecha de Fin:</label>
          <input
            type="date"
            id="POST-endDate"
            name="POST-endDate"
            min={today}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <br />
          <br />
          {/* Start Time */}
          <label htmlFor="POST-startTime">Hora de Inicio:</label>
          <input
            type="time"
            id="POST-startTime"
            name="POST-startTime"
            min="08:00"
            max="22:00"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <br />
          <br />
          {/* End Time */}
          <label htmlFor="POST-endTime">Hora de Fin:</label>
          <input
            type="time"
            id="POST-endTime"
            name="POST-endTime"
            min="08:00"
            max="22:00"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
          <br />
          <br />
          {/* Teacher */}
          <label htmlFor="POST-profesor">Profesor:</label>
          <select id="POST-profesor" name="POST-profesor">
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.user.name}
              </option>
            ))}
          </select>
          <br />
          <br />
          {/* Center */}
          <label htmlFor="POST-centro">Centro:</label>
          <select id="POST-centro" name="POST-centro">
            {centers.map((center) => (
              <option key={center._id} value={center._id}>
                {center.user.name}
              </option>
            ))}
          </select>
          <br />
          <br />
          {/* Duration */}
          {/* <label htmlFor="POST-duracion">Duración de la clase (minutos):</label>
          <input
            type="range"
            id="POST-duracion"
            name="POST-duracion"
            min="30"
            max="120"
            step="5"
            onInput={(e) =>
              (e.target.nextElementSibling.value = e.target.value)
            }
          />
          <output>75</output> min
          <br />
          <br /> */}
          {/* Type */}
          <label htmlFor="POST-tipo">Tipo de Yoga:</label>
          <select id="POST-tipo" name="POST-tipo">
            <option value="hatha">Hatha</option>
            <option value="vinyasa">Vinyasa</option>
            <option value="dharma">Dharma</option>
            <option value="sivananda">Sivananda</option>
          </select>
          <br />
          <br />
          {/* Nº Participants */}
          <label htmlFor="POST-participants">Nº de participantes</label>
          <input
            type="number"
            id="POST-participants"
            name="POST-participants"
            min="1"
            max="10"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            required
          />
          <br />
          <br />
          {/* Modality */}
          <label>Modalidad:</label>
          <br />
          <input
            type="radio"
            id="POST-online"
            name="modalidad"
            value="online"
          />
          <label htmlFor="POST-online">Online</label>
          <br />
          <input
            type="radio"
            id="POST-presencial"
            name="modalidad"
            value="presencial"
          />
          <label htmlFor="POST-presencial">Presencial</label>
          <br />
          <br />
          {/* Description */}
          <label htmlFor="POST-description">Descripción</label>
          <br />
          <textarea
            id="POST-description"
            name="POST-description"
            rows="4"
            cols="50"
          />
          <br />
          <br />
          {/* Submit button */}
          <input type="submit" value="Enviar" />
        </form>

        <button onClick={toggleDialog}>Close</button>
      </div>
    </dialog>
  );
};
