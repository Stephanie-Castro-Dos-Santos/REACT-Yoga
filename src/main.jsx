import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  PlacesProvider,
  MapProvider,
  AuthProvider,
  CalendarProvider,
  FilterProvider,
  DialogProvider,
} from "./contexts/index.js";
import { ChakraProvider } from "@chakra-ui/react";
//import './index.css'

if (!navigator.geolocation) {
  const msg = "Tu navegador no tiene opción de Geolocalización";
  alert(msg);
  throw new Error(msg);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ChakraProvider resetCSS={false}> */}
    <AuthProvider>
      <FilterProvider>
        <CalendarProvider>
          <DialogProvider>
            <PlacesProvider>
              <MapProvider>
                <App />
              </MapProvider>
            </PlacesProvider>
          </DialogProvider>
        </CalendarProvider>
      </FilterProvider>
    </AuthProvider>
    {/* </ChakraProvider> */}
  </React.StrictMode>
);
