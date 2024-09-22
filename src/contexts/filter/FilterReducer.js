// El reducer gestiona las acciones para actualizar o resetear los filtros
export const FilterReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTERS":
      return { ...state, ...action.payload }; // Actualizar el estado de los filtros con los valores proporcionados
    case "RESET_FILTERS":
      return {
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
      }; // Reiniciar los valores de los filtros
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
