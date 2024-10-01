import { useMemo, useContext } from "react";
import { FilterContext } from "../contexts/index";
import dayjs from "dayjs";

export const useFilter = (allEvents) => {
  const { filters } = useContext(FilterContext);

  const filteredEvents = useMemo(() => {
    if (!allEvents || allEvents.length === 0) {
      return [];
    }

    // Filtramos los filtros activos (excluimos los vacíos)
    const activeFilters = Object.entries(filters).filter(
      ([key, value]) => value !== "" && value !== null && value !== undefined
    );

    //console.log(activeFilters);

    // Si no hay filtros activos, devolvemos todos los eventos
    if (activeFilters.length === 0) {
      return allEvents;
    }

    // Aplicamos los filtros a los eventos
    return allEvents.filter((event) => {
      return activeFilters.every(([key, value]) => {
        // Manejo especial para 'location' y 'coordinates'
        //console.log(key + ": " + value);

        if (key === "location" && value) {
          // const example = event.address.location
          // console.log()
          return (
            event.address?.location && event.address.location.includes(value)
          );
        }

        if (key === "coordinates" && value) {
          // console.log(value);
          return (
            event.address?.coordinates &&
            event.address?.coordinates[0] === value[0] &&
            event.address?.coordinates[1] === value[1]
          );
        }

        // Manejo de fechas (startDate y endDate)
        const dateFields = {
          startDate: "start", // el campo 'start' en los eventos
          endDate: "end", // el campo 'end' en los eventos
        };

        if (dateFields[key]) {
          return dayjs(event[dateFields[key]]).format("YYYY-MM-DD") === value;
        }

        // Comparación especial para el título (coincidencia parcial)
        if (key === "title") {
          return event.title.toLowerCase().includes(value.toLowerCase());
        }

        // Comparación genérica para otros campos (string, boolean, number)
        if (event[key] !== undefined) {
          if (typeof event[key] === "string") {
            return event[key].toLowerCase() === value.toLowerCase();
          } else if (typeof event[key] === "boolean") {
            return event[key] === (value === "true");
          } else if (typeof event[key] === "number") {
            return event[key] === Number(value);
          } else if (Array.isArray(event[key])) {
            return event[key].includes(value);
          }
        }

        // Si ninguna condición se cumple, devolvemos false
        return false;
      });
    });
  }, [filters, allEvents]);

  return filteredEvents;
};
