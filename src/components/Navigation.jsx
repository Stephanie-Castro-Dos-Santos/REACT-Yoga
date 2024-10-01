import React from "react";
import { useLocation, Link } from "react-router-dom";
import { demo_logo, user_dumy } from "../assets";
import { AvatarDropdown } from "./index";
import "../styles";

const Navigation = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname === "/auth";

  return (
    !isAuthRoute && (
      <nav>
        <ul>
          <li className="logo-container">
            <Link to="/">
              <img src={demo_logo} alt="logo" className="home-logo" />
            </Link>
          </li>
          <div className="menu-container">
            <div className="links-container">
              <li>
                <Link to="/events">Eventos</Link>
              </li>
              <li>
                <Link to="/teachers">Profesores</Link>
              </li>
              <li>
                <Link to="/reviews">Reseñas</Link>
              </li>
              <li>
                <Link to="/teachers">Profesores</Link>
              </li>
              <li>
                <Link to="/contact">Contacto</Link>
              </li>
              <li className="profile-container">
                {/* <Link to="/auth">
                  <img
                    src={user_dumy}
                    alt="profilePicture"
                    className="user-picture"
                  />
                </Link> */}
                <AvatarDropdown />
              </li>
            </div>
          </div>
        </ul>
      </nav>
    )
  );
};

export default Navigation;
