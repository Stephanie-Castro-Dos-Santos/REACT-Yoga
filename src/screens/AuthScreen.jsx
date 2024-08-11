import React, { useState } from "react";
import { useAuth, useFormState } from "../hooks";

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [{ email, password, name }, handleChange] = useFormState({
    email: "",
    password: "",
    name: "",
  });
  const { error, success, handleAuth } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAuth(isLogin, { email, password, ...(isLogin ? {} : { name }) });
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
    </div>
  );
};
