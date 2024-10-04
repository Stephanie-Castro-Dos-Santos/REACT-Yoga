import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DialogBase } from "./DialogBase";
import { CalendarContext } from "../contexts/index";
import dayjs from "dayjs";
import axios from "axios";
import { SearchBox } from "./index";

export const DialogOperation = ({ onClose, data }) => {
  const { addEvent, editEvent } = useContext(CalendarContext);
  const [teachers, setTeachers] = useState([]);
  const [centers, setCenters] = useState([]);
  const [isCustomLocation, setIsCustomLocation] = useState(!data.centerId); // Inicializa con true si hay dirección
  const [selectedAddress, setSelectedAddress] = useState(
    data.address ? data.address : null
  ); // Si ya tiene dirección, la preseleccionamos

  // console.log(data);

  // Valores predeterminados del formulario
  const defaultFormValues = {
    id: data.id,
    calendarId: data.calendarId,
    title: data.title || "",
    start: data.start ? dayjs(data.start).format("YYYY-MM-DDTHH:mm") : "",
    end: data.end ? dayjs(data.end).format("YYYY-MM-DDTHH:mm") : "",
    typeYoga: data.typeYoga || "",
    mode: data.mode || "Online",
    participants: data.participants || 1,
    description: data.description || "",
    link: data.link || "",
    address: {
      location: selectedAddress?.location ? selectedAddress.location : null,
      coordinates: selectedAddress?.coordinates
        ? selectedAddress.coordinates
        : null,
    },
  };

  const { register, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    const fetchTeachersAndCenters = async () => {
      try {
        const [teachersResponse, centersResponse] = await Promise.all([
          axios.get(`${API_URL}/teachers`),
          axios.get(`${API_URL}/centers`),
        ]);
        setTeachers(teachersResponse.data || []);
        setCenters(centersResponse.data || []);
      } catch (error) {
        console.error("Error al cargar profesores o centros:", error);
      }
    };

    fetchTeachersAndCenters();
    reset(defaultFormValues);
  }, [data, reset]);

  const onSubmit = async (formData) => {
    const { start, end, ...rest } = formData;
    const eventData = {
      ...rest,
      startDate: start,
      endDate: end,
    };

    console.log("ONSUBMIT EVENTDATA: ");
    console.log(eventData);

    if (eventData.mode === "Presencial") {
      if (isCustomLocation && selectedAddress) {
        eventData.address = {
          location: selectedAddress.location,
          coordinates: selectedAddress.coordinates,
        };
        delete eventData.centerId;
      } else {
        delete eventData.address;
      }
      delete eventData.link; // No se necesita el link en Presencial
    } else {
      delete eventData.centerId; // Eliminar si es Online
      delete eventData.address; // No hay dirección en Online
    }

    if (data.dialogMode === "CREATE") {
      await addEvent(eventData);
    } else {
      await editEvent(eventData);
    }

    onClose();
  };

  // Modo de la clase (Online o Presencial)
  const mode = watch("mode");

  return (
    <DialogBase isOpen={true} onClose={onClose}>
      <h2>{data.dialogMode === "CREATE" ? "Crear Evento" : "Editar Evento"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*<input
          type="hidden"
          {...register("calendarId")}
          value={data.calendarId}
        />*/}
        <input
          {...register("title", { required: true })}
          placeholder="Título"
        />
        <br />
        <input
          {...register("start", { required: true })}
          type="datetime-local"
        />
        <br />
        <input {...register("end", { required: true })} type="datetime-local" />
        <br />

        {/* Selección de profesor */}
        {teachers.length > 0 && (
          <>
            <label htmlFor="teacherId">Profesor:</label>
            <select {...register("teacherId", { required: true })}>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.user ? teacher.user.name : "Nombre no disponible"}
                </option>
              ))}
            </select>
            <br />
          </>
        )}

        {/* Tipo de Yoga */}
        <select {...register("typeYoga", { required: true })}>
          <option value="Hatha">Hatha</option>
          <option value="Vinyasa">Vinyasa</option>
          <option value="Dharma">Dharma</option>
          <option value="Sivananda">Sivananda</option>
        </select>
        <br />

        {/* Modalidad */}
        <select {...register("mode", { required: true })}>
          <option value="Online">Online</option>
          <option value="Presencial">Presencial</option>
        </select>
        <br />

        {mode === "Online" && (
          <>
            <input
              {...register("link", { required: true })}
              placeholder="Enlace de la clase"
            />
            <br />
          </>
        )}

        {mode === "Presencial" && (
          <>
            <label htmlFor="customLocation">
              Usar dirección personalizada:
            </label>
            <input
              type="checkbox"
              checked={isCustomLocation}
              onChange={(e) => {
                setIsCustomLocation(e.target.checked);
                if (!e.target.checked) {
                  // Resetear dirección seleccionada si no se utiliza localización personalizada
                  setSelectedAddress(null);
                }
              }}
            />

            <br />

            {isCustomLocation ? (
              <SearchBox
                onSelect={setSelectedAddress}
                defaultAddress={selectedAddress}
              />
            ) : (
              <>
                {centers.length > 0 && (
                  <>
                    <label htmlFor="centerId">Centro:</label>
                    <select {...register("centerId", { required: true })}>
                      {centers.map((center) => (
                        <option key={center._id} value={center._id}>
                          {center.user
                            ? center.user.name
                            : "Nombre no disponible"}
                        </option>
                      ))}
                    </select>
                    <br />
                  </>
                )}
              </>
            )}
          </>
        )}

        <input
          {...register("participants", { required: true })}
          type="number"
          min="1"
          placeholder="Número de participantes"
        />
        <br />
        <textarea {...register("description")} placeholder="Descripción" />
        <br />
        <button type="submit">
          {data.dialogMode === "CREATE" ? "Crear" : "Guardar"}
        </button>
      </form>
    </DialogBase>
  );
};
