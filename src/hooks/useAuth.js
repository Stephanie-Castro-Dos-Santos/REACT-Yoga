import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "./useSession";
import axios from "axios";

export const useAuth = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useSession();

  const handleAuth = async (isLogin, data) => {
    const url = `http://localhost:3000/api/${isLogin ? "login" : "register"}`;
    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Enviar cookies con la solicitud
      });

      const responseData = response.data;
      setSuccess(responseData.message || "Operación exitosa");

      // Redirigir al inicio después de la autenticación
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Ocurrió un error");
      setSuccess("");
    }
  };

  return { error, success, handleAuth };
};
