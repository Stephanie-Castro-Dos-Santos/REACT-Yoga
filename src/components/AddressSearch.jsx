import React, { useEffect, useRef, useState } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

// Configuración de tu token de Mapbox
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export const AddressSearch = ({ onSelect, defaultAddress }) => {
  const geocoderContainerRef = useRef(null);
  const [geocoder, setGeocoder] = useState(null);

  useEffect(() => {
    if (!geocoder && geocoderContainerRef.current) {
      const newGeocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: "address",
        placeholder: "Buscar dirección",
      });

      newGeocoder.addTo(geocoderContainerRef.current);
      setGeocoder(newGeocoder);

      // Listener para cuando se selecciona una dirección
      const handleResult = (e) => {
        const { place_name, geometry } = e.result;
        const [longitude, latitude] = geometry.coordinates;
        console.log("Selected address:", place_name);
        console.log("Longitude:", longitude);
        console.log("Latitude:", latitude);
        onSelect({
          location: place_name,
          coordinates: [longitude, latitude],
        });
      };

      // Añadir el listener al geocoder
      newGeocoder.on("result", handleResult);

      // Cleanup: remover el listener y el geocoder al desmontar el componente
      return () => {
        newGeocoder.off("result", handleResult);
        newGeocoder.onRemove();
      };
    }
  }, [onSelect]);

  // Efecto para manejar defaultAddress y actualizar la dirección del geocoder
  useEffect(() => {
    if (geocoder && defaultAddress && defaultAddress.location) {
      console.log("Setting default address:", defaultAddress.location);
      geocoder.setInput(defaultAddress.location); // Establecer el valor en el input del geocoder
    }
  }, [geocoder, defaultAddress]);

  // Efecto para manejar cambios en el input del geocoder
  useEffect(() => {
    if (geocoder) {
      const handleInputChange = (e) => {
        console.log("Input changed:", e.target.value);
      };

      geocoder.on("input", handleInputChange);

      return () => {
        geocoder.off("input", handleInputChange);
      };
    }
  }, [geocoder]);

  return (
    <div
      ref={geocoderContainerRef}
      style={{ width: "100%" }}
      className="geocoder-container"
    />
  );
};
