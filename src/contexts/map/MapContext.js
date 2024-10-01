import { createContext } from "react";

export const MapContext = createContext({
  isMapReady: false,
  map: undefined,
  addresses: [],
  setMap: () => {},
  setAddresses: () => {},
});
