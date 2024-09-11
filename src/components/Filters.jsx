import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FilterContext } from "../contexts/index";

export const Filters = () => {
  const { setFilters, resetFilters } = useContext(FilterContext); // Obtener funciones del contexto
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      startDate: "",
      endDate: "",
      teacher: "",
      center: "",
      type: "",
      modality: "",
    },
  });

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (data) => {
    setFilters(data); // Actualizar los filtros en el contexto
  };

  // Función para resetear los filtros
  const handleReset = () => {
    reset(); // Resetear los valores del formulario
    resetFilters(); // Limpiar los filtros en el contexto
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Título */}
      <label htmlFor="title">Título:</label>
      <input type="text" {...register("title")} placeholder="Título" />
      <br />
      {/* Fecha de inicio */}
      <label htmlFor="startDate">Fecha de Inicio:</label>
      <input type="date" {...register("startDate")} />
      <br />
      {/* Fecha de fin */}
      <label htmlFor="endDate">Fecha de Fin:</label>
      <input type="date" {...register("endDate")} />
      <br />
      {/* Tipo de Yoga */}
      <label htmlFor="type">Tipo de Yoga:</label>
      <select {...register("type")}>
        <option value="hatha">Hatha</option>
        <option value="vinyasa">Vinyasa</option>
        <option value="dharma">Dharma</option>
        <option value="sivananda">Sivananda</option>
      </select>
      <br />
      {/* Modalidad */}
      <label>Modalidad:</label>
      <br />
      <label>
        <input type="radio" value="online" {...register("modality")} /> Online
      </label>
      <br />
      <label>
        <input type="radio" value="presencial" {...register("modality")} />{" "}
        Presencial
      </label>
      <br />
      {/* Botón de enviar */}
      <button type="submit">Buscar</button>
      <button type="button" onClick={handleReset}>
        Limpiar Filtros
      </button>
    </form>
  );
};
