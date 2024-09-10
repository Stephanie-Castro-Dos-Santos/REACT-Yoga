// AuthReducer.js
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userId: action.payload.userId,
        role: action.payload.role,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return { ...state, userId: null, role: null, isAuthenticated: false };
    default:
      return state;
  }
};
