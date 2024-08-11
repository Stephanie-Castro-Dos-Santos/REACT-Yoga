import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (isLogin, data) => {
    const url = `http://localhost:3000/api/${isLogin ? "login" : "register"}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok)
        throw new Error(
          (await response.json()).message || "Error en la solicitud"
        );

      setSuccess((await response.json()).message || "Operación exitosa");
      setError("");
      navigate("/home");
    } catch (err) {
      setError(err.message || "Ocurrió un error");
      setSuccess("");
    }
  };

  return { error, success, handleAuth };
};
