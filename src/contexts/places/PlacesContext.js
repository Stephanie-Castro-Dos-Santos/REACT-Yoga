import { createContext } from "react";

export const PlacesContext = createContext({
  isLoading: false,
  userLocation: undefined,
});
