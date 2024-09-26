import React, { useState, useContext, useEffect } from "react";
import { AuthContext, CalendarContext } from "../contexts/index";
import { Calendar, Filters } from "../components";
import { useSession, useAuth } from "../hooks/index";
import "../styles";

export const CalendarsScreen = () => {
  const {
    userId,
    role: newRole,
    initialRole,
    isAuthenticated,
  } = useContext(AuthContext);

  const { loadData, roleType, setRoleType } = useContext(CalendarContext);
  const { switchRole } = useAuth();

  // Estado local para cambiar el rol
  const [role, setRole] = useState(newRole);

  useEffect(() => {
    if (newRole) {
      setRole(newRole); // Sincronizar role con newRole
    }
  }, [newRole]);

  useEffect(() => {
    // Cargar los datos cuando cambie el rol o el calendario
    loadData();
  }, [role, roleType, loadData]);

  // Manejar el cambio de rol cuando se activa el switch
  const handleRoleSwitch = async () => {
    try {
      const newRole = role === "teacher" ? "student" : "teacher";
      setRole(newRole); // Actualizar el estado localmente
      await switchRole(userId, newRole, initialRole); // Cambiar el rol en el servidor
    } catch (error) {
      console.error("Error changing role:", error);
    }
  };

  // Manejar el cambio de calendario
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRoleType(selectedRole); // Actualizar roleType
  };

  console.log("INITIAL ROLE: " + initialRole);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <div className="control-container">
            {initialRole === "teacher" && (
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={handleRoleSwitch}
                  checked={role === "student"}
                />
                <span className="slider round"></span>
              </label>
            )}
            <br />
            <select onChange={handleRoleChange} value={roleType}>
              <option value="">Seleccione un calendario</option>
              {role === "teacher" ? (
                <option value="teacher">Teacher Calendar</option>
              ) : (
                <option value="student">Student Calendar</option>
              )}
              <option value="public">Public Calendar</option>
            </select>
            <br />
          </div>
          <div id="calendar" className="parent">
            <Filters className="filters-container" />
            <Calendar className="calendar-container" />
          </div>
        </div>
      ) : (
        <p>No estás autenticado.</p>
      )}
    </div>
  );
};
