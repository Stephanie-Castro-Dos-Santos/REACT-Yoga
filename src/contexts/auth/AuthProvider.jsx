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

  const checkSession = async () => {
    try {
      const response = await axios.get(`${API_URL}/session`, {
        withCredentials: true,
      });

      const { userId, role, initialRole } = response.data;

      if (userId && role) {
        dispatch({ type: "LOGIN", payload: { userId, role, initialRole } });
        // Guardar los datos de sesión en una cookie
        // Cookies.set(
        //   "sessionData",
        //   JSON.stringify({ userId, role, initialRole }),
        //   { expires: 1 }
        // );
      }
    } catch (err) {
      console.error("No se pudo recuperar la sesión: ", err);
    }
  };

  const login = async (user) => {
    console.log(user);
    try {
      dispatch({
        type: "LOGIN",
        payload: {
          userId: user.userId,
          role: user.role,
          initialRole: user.role,
        },
      });
    } catch (err) {
      console.error("Error en el login: ", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      // Cookies.remove("sessionData");
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.error("Error cerrando sesión", err);
    }
  };

  const setRole = async (role) => {
    try {
      const response = await axios.patch(
        `${API_URL}/switch-role`,
        { role },
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "SET_ROLE", payload: { role: response.data.role } });
    } catch (err) {
      console.error("Error cambiando el rol", err);
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
