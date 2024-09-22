import { useMemo, useContext } from "react";
import { FilterContext } from "../contexts/index";
import dayjs from "dayjs";

export const useFilter = (allEvents) => {
  const { filters } = useContext(FilterContext);

  const filteredEvents = useMemo(() => {
    if (!allEvents || allEvents.length === 0) {
      return [];
    }

    const activeFilters = Object.entries(filters).filter(
      ([key, value]) => value !== "" && value !== null && value !== undefined
    );

    if (activeFilters.length === 0) {
      return allEvents;
    }

    return allEvents.filter((event) => {
      return activeFilters.every(([key, value]) => {
        // Mapeo para comparar las fechas de inicio y fin
        const dateFields = {
          startDate: "start",
          endDate: "end",
        };

        if (dateFields[key]) {
          return dayjs(event[dateFields[key]]).format("YYYY-MM-DD") === value;
        }

        // Comparación especial para el título (coincidencia parcial)
        if (key === "title") {
          return event.title.toLowerCase().includes(value.toLowerCase());
        }

        // Comparación para otros campos
        if (typeof event[key] === "string") {
          return event[key].toLowerCase() === value.toLowerCase();
        } else if (typeof event[key] === "boolean") {
          return event[key] === (value === "true");
        } else if (typeof event[key] === "number") {
          return event[key] === Number(value);
        } else if (Array.isArray(event[key])) {
          return event[key].includes(value);
        }

        // Si el tipo no coincide con ninguno de los anteriores, consideramos que no hay coincidencia
        return false;
      });
    });
  }, [filters, allEvents]);

  return filteredEvents;
};
