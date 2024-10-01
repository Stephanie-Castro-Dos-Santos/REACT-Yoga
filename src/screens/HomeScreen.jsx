import React, { useContext, useEffect } from "react";
import { DialogProvider, AuthContext } from "../contexts/index";
import { BtnLocation, Calendar, Map, Filters } from "../components";
import "../styles";

export const HomeScreen = () => {
  const { isAuthenticated, userId, role, checkSession } =
    useContext(AuthContext);

  return (
    <div>
      <h1>Bienvenido a Yogin</h1>
      {isAuthenticated ? (
        <p>
          Bienvenido, tu ID es {userId} y tu rol es {role}.
        </p>
      ) : (
        <p>No estás autenticado.</p>
      )}
      <div id="calendar" className="parent">
        <Filters className="filters-container" />
        <Calendar className="calendar-container" />
      </div>
    </div>
  );
};
