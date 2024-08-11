import { useState } from "react";

export const useFormState = (initialState = {}) => {
  const [state, setState] = useState(initialState);
  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
  return [state, handleChange];
};
