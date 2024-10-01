export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userId: action.payload.userId,
        role: action.payload.role,
        initialRole: action.payload.initialRole,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        userId: null,
        role: null,
        initialRole: null,
        isAuthenticated: false,
      };
    case "SET_ROLE":
      return {
        ...state,
        role: action.payload.role,
      };
    default:
      return state;
  }
};
