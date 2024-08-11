import React, { useEffect, useRef, useState, useContext } from "react";
import mapboxgl, { Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Geocoder } from "@mapbox/search-js-react";
import { PlacesContext, MapContext } from "../contexts";

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  //const geocoder = useRef(null);
  //const [mapLoaded, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const mbToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);

  mapboxgl.accessToken = mbToken;

  useEffect(() => {
    //if (!userLocation) return;

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

    // return () => {
    //   if (mapInstanceRef.current) {
    //     mapInstanceRef.current.remove();
    //   }
    // };
  }, [userLocation, mbToken]);

  return (
    <div>
      {/* <h1>{userLocation?.join(",")}</h1> */}
      <Geocoder
        accessToken={mbToken}
        map={mapInstanceRef.current}
        mapboxgl={mapboxgl}
        value={inputValue}
        onChange={(d) => {
          setInputValue(d);
        }}
        marker
      />
      <div
        ref={mapContainerRef}
        style={{
          height: "100vh",
          left: 0,
          top: 0,
          width: "100vw",
        }}
      ></div>
    </div>
  );
};

export default Map;
