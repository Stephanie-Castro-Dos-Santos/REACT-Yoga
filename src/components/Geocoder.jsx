import { useState } from "react";
import { Geocoder as MapboxGeocoder } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export const Geocoder = ({ mapInstance, onResult }) => {
  const mbToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const [inputValue, setInputValue] = useState("");

  return (
    <MapboxGeocoder
      accessToken={mbToken}
      map={mapInstance} // Puedes pasar el mapa o no, depende del contexto
      mapboxgl={mapboxgl}
      value={inputValue}
      onRetrieve={(result) => {
        if (onResult) {
          const formattedResult = {
            address: result.features[0].place_name,
            coordinates: result.features[0].geometry.coordinates,
          };
          onResult(formattedResult); // Pasar los resultados a un callback para manejar datos en formularios
        }
      }}
      onChange={(value) => setInputValue(value)}
      marker={!!mapInstance} // Mostrar marcador si hay un mapa
    />
  );
};
