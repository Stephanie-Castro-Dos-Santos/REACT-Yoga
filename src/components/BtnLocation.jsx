import { useContext } from "react";
import { PlacesContext, MapContext } from "../contexts";

export const BtnLocation = () => {
  const { userLocation } = useContext(PlacesContext);
  const { map, isMapReady } = useContext(MapContext);
  const onClick = () => {
    if (!isMapReady) throw new Error("Mapa no está listo");
    if (!userLocation) throw new Error("No hay ubicación del usuario");

    map?.flyTo({
      zoom: 14,
      center: userLocation,
    });
  };
  return <button onClick={onClick}>Mi Ubicación</button>;
};
