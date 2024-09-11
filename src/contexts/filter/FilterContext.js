import { createContext } from "react";

// Estado inicial y funciones que serán usadas en el contexto
export const FilterContext = createContext({
  title: "",
  startDate: "",
  endDate: "",
  teacher: "",
  center: "",
  duration: "",
  type: "",
  modality: "",
  setFilters: () => {}, // Función que se definirá en el FilterProvider
  resetFilters: () => {}, // Función que se definirá en el FilterProvider
});
