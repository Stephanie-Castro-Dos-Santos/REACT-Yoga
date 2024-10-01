import React, { useEffect, useRef, useContext, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Geocoder } from "@mapbox/search-js-react";
import { PlacesContext, MapContext, FilterContext } from "../contexts";

export const Map = ({}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const mbToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const [value, setValue] = useState("");

  const { userLocation } = useContext(PlacesContext);
  const { setMap, setAddresses, isMapReady } = useContext(MapContext);
  const { setFilters } = useContext(FilterContext);

  mapboxgl.accessToken = mbToken;

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: userLocation
        ? [userLocation[0], userLocation[1]]
        : [-3.70256, 40.4165],
      zoom: 14,
    });

    mapInstanceRef.current.on("load", () => {
      setMap(mapInstanceRef.current);
    });
  }, [userLocation, mbToken]);

  // Cuando el mapa esté listo, cargar las direcciones
  useEffect(() => {
    if (isMapReady) {
      setAddresses();
    }
  }, [isMapReady]);

  const handleGeocoderChange = (event) => {
    const { coordinates, full_address } = event.properties;
    // console.log(coordinates);

    setValue(full_address);

    setFilters({
      location: full_address,
      coordinates: [coordinates.longitude, coordinates.latitude],
    });
  };

  return (
    <div>
      <Geocoder
        accessToken={mbToken}
        map={mapInstanceRef.current}
        mapboxgl={mapboxgl}
        value={value}
        onRetrieve={handleGeocoderChange}
        marker
      />
      <div
        ref={mapContainerRef}
        style={{
          height: "25vh",
          left: 0,
          top: 0,
          width: "25vw",
        }}
      ></div>
    </div>
  );
};
