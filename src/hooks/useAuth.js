import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/index"; // Asegúrate de que esto apunte a tu contexto de autenticación
import axios from "axios";

export const useAuth = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { setRole, login } = useContext(AuthContext); // Añadir contexto de autenticación

  const handleAuth = async (isLogin, data) => {
    const url = `${API_URL}/${isLogin ? "login" : "register"}`;
    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const responseData = response.data;

      setSuccess(responseData.message || "Operación exitosa");
      login();

      // Redirigir al inicio después de la autenticación
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Ocurrió un error");
      setSuccess("");
    }
  };

  const switchRole = async (userId, newRole) => {
    try {
      const response = await axios.patch(
        `${API_URL}/switch-role`,
        { userId, role: newRole },
        { withCredentials: true }
      );

      setRole(response.data.role); // Actualiza el rol y roleType en el contexto
      setSuccess("Rol cambiado exitosamente");
    } catch (err) {
      setError(err.response?.data?.message || "Error al cambiar rol");
    }
  };

  return { error, success, handleAuth, switchRole };
};
