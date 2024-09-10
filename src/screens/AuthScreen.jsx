import React, { useState, useContext } from "react";
import { useAuth, useFormState } from "../hooks";
import { AuthContext } from "../contexts/index";

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [{ email, password, name, role }, handleChange] = useFormState({
    email: "",
    password: "",
    name: "",
    role: "",
  });
  const { error, success, handleAuth } = useAuth();
  const { userId, role: userRole, isAuthenticated } = useContext(AuthContext); // Acceder al contexto usando useContext

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAuth(isLogin, {
      email,
      password,
      ...(isLogin ? {} : { name, role }),
    });
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="role">Rol: </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un rol</option>
              <option value="student">Alumno</option>
              <option value="teacher">Profesor</option>
              <option value="center">Centro</option>
            </select>
          </div>
        )}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {isAuthenticated && (
        <p>
          Bienvenido, tu ID es {userId} y tu rol es {userRole}.
        </p>
      )}
    </div>
  );
};
