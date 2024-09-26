// AuthContext.js
import { createContext } from "react";

export const AuthContext = createContext({
  userId: null,
  role: null,
  initialRole: null,
  isAuthenticated: false,
});
