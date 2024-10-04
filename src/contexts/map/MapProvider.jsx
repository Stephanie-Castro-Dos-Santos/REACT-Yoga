import { useReducer, useEffect, useContext, useRef } from "react";
import { FilterContext, CalendarContext, MapContext } from "../index";
import { MapReducer } from "./MapReducer";
import { Marker, Popup } from "mapbox-gl";
import axios from "axios";

const INITIAL_STATE = {
  isMapReady: false,
  map: undefined,
  addresses: [],
};

export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);
  const markerRef = useRef([]); // Usamos un ref para almacenar los marcadores creados
  const API_URL = import.meta.env.VITE_API_URL;

  // Accede a setFilters fuera de handleMarkerClick
  const { setFilters } = useContext(FilterContext);
  const { addEvent, updateEvent, removeEvent, events } =
    useContext(CalendarContext);

  // Función para establecer el mapa en el estado
  const setMap = (map) => {
    const locationPopup = new Popup().setHTML(`<h4>Mi ubicación</h4>`);
    new Marker({ color: "purple" })
      .setLngLat(map.getCenter())
      .setPopup(locationPopup)
      .addTo(map);
    dispatch({ type: "setMap", payload: map });
  };

  // Función para establecer las direcciones desde el backend
  const setAddresses = async () => {
    try {
      const response = await axios.get(`${API_URL}/addresses`);
      dispatch({ type: "setAddresses", payload: response.data });
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // Función para manejar el clic en el marcador
  const handleMarkerClick = (coordinates, full_address) => {
    console.log(`Marker clicked at: ${coordinates} (${full_address})`);

    // Actualizar filtros usando setFilters
    setFilters({
      location: full_address,
      coordinates: [coordinates[0], coordinates[1]], // Array con coordenadas [longitud, latitud]
    });
  };

  // Función para eliminar todos los marcadores existentes del mapa
  const clearMarkers = () => {
    markerRef.current.forEach((marker) => marker.remove());
    markerRef.current = []; // Vaciamos el array de marcadores
  };

  // Efecto para crear los marcadores en el mapa cuando el mapa y las direcciones estén listas
  useEffect(() => {
    if (state.map && state.addresses.length > 0) {
      clearMarkers(); // Limpiamos los marcadores previos

      state.addresses.forEach((address) => {
        const marker = new Marker({ color: "#6598eb" })
          .setLngLat([address.coordinates[0], address.coordinates[1]])
          .setPopup(new Popup().setText(address.location))
          .addTo(state.map);

        // Agregar evento de clic al marcador
        marker.getElement().addEventListener("click", () => {
          handleMarkerClick(
            [address.coordinates[0], address.coordinates[1]],
            address.location
          );
        });

        // Guardar el marcador en el array de ref
        markerRef.current.push(marker);
      });
    }
  }, [state.map, state.addresses, events]); // Se ejecuta cada vez que cambian los eventos o direcciones

  // Llama a `setAddresses` cuando se montan los eventos o se actualizan
  useEffect(() => {
    setAddresses(); // Recarga las direcciones cada vez que hay un cambio en los eventos
  }, [addEvent, updateEvent, removeEvent, events]); // Ejecuta este efecto cuando los eventos cambian

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap,
        setAddresses,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
