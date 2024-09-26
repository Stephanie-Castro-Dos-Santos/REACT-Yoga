import React, { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./AuthReducer";

const initialState = {
  userId: null,
  role: null,
  initialRole: null,
  isAuthenticated: false,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userId, role, initialRole) => {
    dispatch({ type: "LOGIN", payload: { userId, role, initialRole } });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const setRole = (role) => {
    dispatch({ type: "SET_ROLE", payload: { role } });
  };

  return (
    <AuthContext.Provider
      value={{
        userId: state.userId,
        role: state.role,
        initialRole: state.initialRole,
        isAuthenticated: state.isAuthenticated,
        login,
        logout,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
