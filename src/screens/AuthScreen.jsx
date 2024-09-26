import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks";
import { AuthContext } from "../contexts/index";
import { AddressSearch } from "../components/index"; // Asegúrate de que la ruta de importación sea correcta

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null); // Estado para la dirección seleccionada
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const { error, success, handleAuth } = useAuth();
  const { userId, role: userRole, isAuthenticated } = useContext(AuthContext);

  // Observa los valores actuales de "role"
  const role = watch("role");

  // Función que maneja el envío del formulario
  const onSubmit = (data) => {
    console.log(data);
    const { email, password, name, address } = data;

    // Si está en modo login, solo envía email y password
    handleAuth(isLogin, {
      email,
      password,
      ...(isLogin ? {} : { name, role, address }),
    });
  };

  // Función para manejar la selección de dirección en AddressSearch
  const handleAddressSelect = ({ location, coordinates }) => {
    setSelectedAddress({ location, coordinates }); // Actualiza la dirección seleccionada
    setValue("address", { location, coordinates }); // También actualiza el formulario
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campos adicionales para el registro */}
        {!isLogin && (
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
            />
            {errors.name && <span>Este campo es requerido</span>}
            <br />
            <label htmlFor="role">Rol: </label>
            <select id="role" {...register("role", { required: true })}>
              <option value="">Seleccione un rol</option>
              <option value="student">Alumno</option>
              <option value="teacher">Profesor</option>
              <option value="center">Centro</option>
            </select>
            {errors.role && <span>Este campo es requerido</span>}

            {/* AddressSearch solo se muestra si el rol es "center" */}
            {role === "center" && (
              <div>
                <label htmlFor="address">Dirección:</label>
                <AddressSearch
                  onSelect={handleAddressSelect}
                  defaultAddress={selectedAddress} // Pasa la dirección seleccionada como valor por defecto
                />

                {errors.address?.location && (
                  <span>Dirección es requerida</span>
                )}
                {errors.address?.coordinates && (
                  <span>Coordenadas son requeridas</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Campos comunes para login y registro */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Este campo es requerido</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>Este campo es requerido</span>}
        </div>

        {/* Botón de envío */}
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      {/* Botón para alternar entre login y registro */}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>

      {/* Mostrar mensajes de error o éxito */}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {/* Mostrar mensaje de bienvenida si está autenticado */}
      {isAuthenticated && (
        <p>
          Bienvenido, tu ID es {userId} y tu rol es {userRole}.
        </p>
      )}
    </div>
  );
};
