import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/index";
import Cookies from "js-cookie";

export const useSession = () => {
  const { login } = useContext(AuthContext); // Usar el contexto de autenticación

  useEffect(() => {
    // Obtener los datos de la cookie directamente
    const sessionData = Cookies.get("sessionData");

    if (sessionData) {
      try {
        // Decodificar el JSON de la cookie
        const { userId, role } = JSON.parse(sessionData);

        // Actualizar el contexto de autenticación
        if (userId && role) {
          login(userId, role);
        }
      } catch (e) {
        console.error("Error al decodificar la cookie: ", e);
      }
    } else {
      // Si no hay cookie, verificar la sesión desde el backend
      checkSession();
    }
  }, []);

  const checkSession = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/login", {
        withCredentials: true, // Necesario para enviar cookies
      });

      const { userId, role } = response.data;

      if (userId && role) {
        login(userId, role); // Actualiza el contexto con la información de sesión
      }
    } catch (err) {
      console.error("No se pudo recuperar la sesión: ", err);
    }
  };
};
