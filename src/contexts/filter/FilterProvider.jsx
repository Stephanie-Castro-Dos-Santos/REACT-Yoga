import React, { useReducer } from "react";
import { FilterContext } from "./FilterContext";
import { FilterReducer } from "./FilterReducer";

const initialState = {
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
  location: "",
  coordinates: null,
};

export const FilterProvider = ({ children }) => {
  const [filters, dispatch] = useReducer(FilterReducer, initialState);

  // Función para actualizar los filtros
  const setFilters = (newFilters) => {
    dispatch({ type: "SET_FILTERS", payload: newFilters });
  };

  // Función para resetear los filtros
  const resetFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
