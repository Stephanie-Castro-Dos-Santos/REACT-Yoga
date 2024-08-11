import React, { useReducer, useEffect } from "react";
import { PlacesContext } from "./PlacesContext";
import { PlacesReducer } from "./PlacesReducer";
import { getUserLocation } from "../../helpers/getUserLocation";

const INITIAL_STATE = {
  isLoading: true,
  userLocation: undefined,
};

export const PlacesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PlacesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation()
      .then((lngLat) => {
        dispatch({ type: "setUserLocation", payload: lngLat });
      })
      .catch((err) => {
        console.error("Failed to get user location", err);
      });
  }, []);

  return (
    <PlacesContext.Provider value={{ ...state }}>
      {children}
    </PlacesContext.Provider>
  );
};
