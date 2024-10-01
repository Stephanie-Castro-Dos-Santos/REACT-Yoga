import React, { useReducer, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./AuthReducer";
import Cookies from "js-cookie";

const initialState = {
  userId: null,
  role: null,
  initialRole: null,
  isAuthenticated: false,
};

export const AuthProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Cargar la sesión al montar el componente
  useEffect(() => {
    checkSession();
  }, []);

  const login = async () => {
    const sessionData = Cookies.get("sessionData");

    if (sessionData) {
      try {
        const { userId, role, initialRole } = JSON.parse(sessionData);
        console.log("Login with session data:", sessionData);

        if (userId && role && initialRole) {
          dispatch({ type: "LOGIN", payload: { userId, role, initialRole } });
        }
      } catch (e) {
        console.error("Error al decodificar la cookie: ", e);
      }
    } else {
      // Si no hay cookie, verificar la sesión desde el backend
      checkSession();
    }
  };

  const checkSession = async () => {
    try {
      const response = await axios.get(`${API_URL}/login`, {
        withCredentials: true,
      });

      const { userId, role, initialRole } = response.data;

      if (userId && role) {
        dispatch({ type: "LOGIN", payload: { userId, role, initialRole } });
        // Guardar los datos de sesión en una cookie
        Cookies.set(
          "sessionData",
          JSON.stringify({ userId, role, initialRole }),
          { expires: 1 }
        );
      }
    } catch (err) {
      console.error("No se pudo recuperar la sesión: ", err);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      Cookies.remove("sessionData");
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.error("Error cerrando sesión", err);
    }
  };

  const setRole = (role) => {
    dispatch({ type: "SET_ROLE", payload: { role } });
    // Actualiza la cookie al cambiar el rol
    const sessionData = Cookies.get("sessionData");
    if (sessionData) {
      const { userId, initialRole } = JSON.parse(sessionData);
      Cookies.set(
        "sessionData",
        JSON.stringify({ userId, role, initialRole }),
        { expires: 1 }
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, checkSession, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};
