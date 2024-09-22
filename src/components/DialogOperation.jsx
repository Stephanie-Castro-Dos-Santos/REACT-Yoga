import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DialogBase } from "./DialogBase";
import { CalendarContext } from "../contexts/index";
import dayjs from "dayjs";
import axios from "axios";

export const DialogOperation = ({ onClose, data }) => {
  const { addEvent, editEvent } = useContext(CalendarContext);
  const [teachers, setTeachers] = useState([]);
  const [centers, setCenters] = useState([]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      id: data.id,
      calendarId: data.calendarId,
      title: data.title || "",
      start: data.start ? dayjs(data.start).format("YYYY-MM-DDTHH:mm") : "",
      end: data.end ? dayjs(data.end).format("YYYY-MM-DDTHH:mm") : "",
      typeYoga: data.typeYoga || "",
      mode: data.mode || "Online", // Valor por defecto
      participants: data.participants || 1,
      description: data.description || "",
    },
  });

  //console.log(data);

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
    reset({
      id: data.id,
      calendarId: data.calendarId,
      title: data.title || "",
      start: data.start ? dayjs(data.start).format("YYYY-MM-DDTHH:mm") : "",
      end: data.end ? dayjs(data.end).format("YYYY-MM-DDTHH:mm") : "",
      typeYoga: data.typeYoga || "",
      mode: data.mode || "Online",
      participants: data.participants || 1,
      description: data.description || "",
    });
  }, [data, reset]);

  const onSubmit = async (formData) => {
    const { start, end, ...rest } = formData;
    const eventData = {
      ...rest,
      startDate: start,
      endDate: end,
    };

    if (data.dialogMode === "CREATE") {
      await addEvent(eventData);
    } else {
      await editEvent(eventData);
    }
    onClose();
  };

  return (
    <DialogBase isOpen={true} onClose={onClose}>
      <h2>{data.dialogMode === "CREATE" ? "Create Event" : "Edit Event"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="hidden"
          {...register("calendarId")}
          value={data.calendarId}
        />

        <input {...register("title", { required: true })} placeholder="Title" />
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

        {/* Selección de centro */}
        {centers.length > 0 && (
          <>
            <label htmlFor="centerId">Centro:</label>
            <select {...register("centerId", { required: true })}>
              {centers.map((center) => (
                <option key={center._id} value={center._id}>
                  {center.user ? center.user.name : "Nombre no disponible"}
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
          {/* <option value="Kundalini">Kundalini</option> */}
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

        <input
          {...register("participants", { required: true })}
          type="number"
          min="1"
        />
        <br />

        <textarea {...register("description")} />
        <br />

        <button type="submit">
          {data.dialogMode === "CREATE" ? "Create" : "Update"}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </DialogBase>
  );
};
