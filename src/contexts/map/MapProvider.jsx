import { useReducer } from "react";
import { MapReducer } from "./MapReducer";
import { MapContext } from "./MapContext";
import { Marker, Popup } from "mapbox-gl";

const INITIAL_STATE = {
  isMapReady: false,
  map: undefined,
};
export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);

  const setMap = (map) => {
    const locationPopup = new Popup().setHTML(`<h4>Here I am</h4>`);
    new Marker({ color: "purple" })
      .setLngLat(map.getCenter())
      .setPopup(locationPopup)
      .addTo(map);
    dispatch({ type: "setMap", payload: map });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,

        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
