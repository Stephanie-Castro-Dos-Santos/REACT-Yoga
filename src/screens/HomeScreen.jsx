import React, { useContext } from "react";
import { DialogProvider, AuthContext } from "../contexts/index";
import { BtnLocation, Calendar, Map, Filters } from "../components";
import { useSession } from "../hooks/index";
import "../styles";

export const HomeScreen = () => {
  //Recargar el CONTEXT
  useSession();

  const { userId, role, isAuthenticated } = useContext(AuthContext);

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
