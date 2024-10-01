import React, { useContext, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FilterContext } from "../contexts/index";
import { BtnLocation, Map } from "../components";
import { debounce } from "lodash";

export const Filters = () => {
  const { setFilters, resetFilters, filters } = useContext(FilterContext);
  const { register, watch, reset } = useForm(filters);

  const debouncedSetFilters = useCallback(
    debounce((data) => {
      setFilters(data);
    }, 300),
    [setFilters]
  );

  const watchedValues = watch();

  useEffect(() => {
    debouncedSetFilters(watchedValues);
    return () => {
      debouncedSetFilters.cancel();
    };
  }, [watchedValues, debouncedSetFilters]);

  const handleReset = useCallback(() => {
    reset();
    resetFilters();
  }, [reset, resetFilters]);

  return (
    <div>
      <BtnLocation />
      <Map />
      <form>
        <label htmlFor="title">Título:</label>
        <input type="text" {...register("title")} placeholder="Título" />

        <br />
        <br />

        <label htmlFor="startDate">Fecha de Inicio:</label>
        <input type="date" {...register("startDate")} />

        <br />
        <br />

        <label htmlFor="endDate">Fecha de Fin:</label>
        <input type="date" {...register("endDate")} />

        <br />
        <br />

        <label htmlFor="typeYoga">Tipo de Yoga:</label>
        <select {...register("typeYoga")}>
          <option value="">Todos los tipos</option>
          <option value="Hatha">Hatha</option>
          <option value="Vinyasa">Vinyasa</option>
          <option value="Dharma">Dharma</option>
          <option value="Sivananda">Sivananda</option>
        </select>

        <br />
        <br />

        <legend>Modalidad:</legend>
        <label>
          <input type="radio" value="Online" {...register("mode")} /> Online
        </label>

        <br />

        <label>
          <input type="radio" value="Presencial" {...register("mode")} />{" "}
          Presencial
        </label>

        <br />
        <br />

        <button type="button" onClick={handleReset}>
          Limpiar Filtros
        </button>
      </form>
    </div>
  );
};
