import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDialog } from "../hooks/useDialog";
import { DialogContext, CalendarContext } from "../contexts/index";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import axios from "axios";

// Estado inicial
const initialState = {
  calendarId: "",
  title: "",
  startDate: "",
  endDate: "",
  participants: 1,
  teacherId: "",
  centerId: "",
  typeYoga: "",
  mode: "",
  description: "",
};

// Reducer para manejar los cambios en los campos del formulario
function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
}

export const Dialog = () => {
  //Dialog custom hooks
  const { dialogRef, toggleDialog, closeOutside } = useDialog();

  //Dialog Context
  const {
    isDialogOpen,
    selectedStartDate,
    selectedEndDate,
    selectedStartTime,
    selectedEndTime,
  } = useContext(DialogContext);

  // Calendar Context
  const { calendarId } = useContext(CalendarContext);

  const [teachers, setTeachers] = useState([]);
  const [centers, setCenters] = useState([]);

  const [state, dispatch] = useReducer(formReducer, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchTeachersAndCenters = async () => {
      try {
        const [teachersResponse, centersResponse] = await Promise.all([
          axios.get("http://localhost:3000/api/teachers"),
          axios.get("http://localhost:3000/api/centers"),
        ]);
        setTeachers(teachersResponse.data || []);
        setCenters(centersResponse.data || []);
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
    if (selectedStartDate) {
      dispatch({
        type: "SET_FIELD",
        field: "startDate",
        value: dayjs(selectedStartDate).format("YYYY-MM-DD"),
      });
    }
    if (selectedEndDate) {
      dispatch({
        type: "SET_FIELD",
        field: "endDate",
        value: dayjs(selectedEndDate).format("YYYY-MM-DD"),
      });
    }
    if (selectedStartTime) {
      dispatch({
        type: "SET_FIELD",
        field: "startTime",
        value: selectedStartTime,
      });
    }
    if (selectedEndTime) {
      dispatch({
        type: "SET_FIELD",
        field: "endTime",
        value: selectedEndTime,
      });
    }
  }, [selectedStartDate, selectedEndDate, selectedStartTime, selectedEndTime]);

  const onSubmit = (data) => {
    // Combinar la fecha y la hora antes de enviar
    const startDateTime = new Date(`${data.startDate}T${data.startTime}`);
    const endDateTime = new Date(`${data.endDate}T${data.endTime}`);
    console.log(calendarId);

    const payload = {
      ...data,
      calendarId: calendarId,
      startDate: startDateTime,
      endDate: endDateTime,
    };

    axios
      .post("http://localhost:3000/api/events", payload)
      .then((response) => {
        console.log("Evento creado con éxito:", response.data);
      })
      .catch((error) => {
        console.error("Error al crear el evento:", error.response.data);
      });
  };
  return (
    <dialog ref={dialogRef} onClick={closeOutside}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Título */}
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Título"
            value={state.title}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "title",
                value: e.target.value,
              })
            }
          />
          {errors.title && <span>Título es obligatorio</span>}
          <br />
          <br />

          {/* Fecha de Inicio */}
          <label htmlFor="startDate">Fecha de Inicio:</label>
          <input
            type="date"
            {...register("startDate", { required: true })}
            value={state.startDate}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "startDate",
                value: e.target.value,
              })
            }
          />
          {errors.startDate && <span>Fecha de inicio es obligatoria</span>}
          <br />
          <br />

          {/* Fecha de Fin */}
          <label htmlFor="endDate">Fecha de Fin:</label>
          <input
            type="date"
            {...register("endDate", { required: true })}
            value={state.endDate}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "endDate",
                value: e.target.value,
              })
            }
          />
          {errors.endDate && <span>Fecha de fin es obligatoria</span>}
          <br />
          <br />

          {/* Hora de Inicio */}
          <label htmlFor="startTime">Hora de Inicio:</label>
          <input
            type="time"
            {...register("startTime", { required: true })}
            value={state.startTime}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "startTime",
                value: e.target.value,
              })
            }
          />
          {errors.startTime && <span>Hora de inicio es obligatoria</span>}
          <br />
          <br />

          {/* Hora de Fin */}
          <label htmlFor="endTime">Hora de Fin:</label>
          <input
            type="time"
            {...register("endTime", { required: true })}
            value={state.endTime}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "endTime",
                value: e.target.value,
              })
            }
          />
          {errors.endTime && <span>Hora de fin es obligatoria</span>}
          <br />
          <br />

          {/* Profesor */}
          {teachers.length > 0 && (
            <>
              <label htmlFor="teacherId">Profesor:</label>
              <select
                {...register("teacherId", { required: true })}
                value={state.teacherId}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "teacherId",
                    value: e.target.value,
                  })
                }
              >
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.user ? teacher.user.name : "Nombre no disponible"}
                  </option>
                ))}
              </select>
              {errors.teacherId && <span>Profesor es obligatorio</span>}
              <br />
              <br />
            </>
          )}

          {/* Centro */}
          {centers.length > 0 && (
            <>
              <label htmlFor="centerId">Centro:</label>
              <select
                {...register("centerId", { required: true })}
                value={state.centerId}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "centerId",
                    value: e.target.value,
                  })
                }
              >
                {centers.map((center) => (
                  <option key={center._id} value={center._id}>
                    {center.user ? center.user.name : "Nombre no disponible"}
                  </option>
                ))}
              </select>
              {errors.centerId && <span>Centro es obligatorio</span>}
              <br />
              <br />
            </>
          )}

          {/* Tipo de Yoga */}
          <label htmlFor="typeYoga">Tipo de Yoga:</label>
          <select
            {...register("typeYoga", { required: true })}
            value={state.type}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "type",
                value: e.target.value,
              })
            }
          >
            <option value="Hatha">Hatha</option>
            <option value="Vinyasa">Vinyasa</option>
            <option value="Kundalini">Kundalini</option>
            <option value="Dharma">Dharma</option>
            <option value="Sivananda">Sivananda</option>
          </select>
          {errors.type && <span>Tipo de yoga es obligatorio</span>}
          <br />
          <br />

          {/* Modalidad */}
          <label htmlFor="mode">Modalidad:</label>
          <select
            {...register("mode", { required: true })}
            value={state.mode}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "modalidad",
                value: e.target.value,
              })
            }
          >
            <option value="Online">Online</option>
            <option value="Presencial">Presencial</option>
          </select>
          {errors.modalidad && <span>Modalidad es obligatoria</span>}
          <br />
          <br />

          {/* Participantes */}
          <label htmlFor="participants">Número de participantes:</label>
          <input
            type="number"
            min="1"
            {...register("participants", { required: true, min: 1 })}
            value={state.participants}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "participants",
                value: e.target.value,
              })
            }
          />
          {errors.participants && (
            <span>Debe haber al menos 1 participante</span>
          )}
          <br />
          <br />

          {/* Descripción */}
          <label htmlFor="description">Descripción:</label>
          <textarea
            {...register("description", { required: true })}
            value={state.description}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "description",
                value: e.target.value,
              })
            }
          ></textarea>
          {errors.description && <span>Descripción es obligatoria</span>}
          <br />
          <br />

          <button type="submit">Crear Evento</button>
        </form>
      </div>
    </dialog>
  );
};
