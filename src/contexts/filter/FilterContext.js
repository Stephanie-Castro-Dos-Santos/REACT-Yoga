import { createContext } from "react";

// Estado inicial y funciones que serán usadas en el contexto
export const FilterContext = createContext({
  title: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  teacher: "",
  center: "",
  duration: "",
  typeYoga: "",
  mode: "",
  setFilters: () => {}, // Función que se definirá en el FilterProvider
  resetFilters: () => {}, // Función que se definirá en el FilterProvider
});
