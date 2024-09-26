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
              <li className="logout-container">
                <Link to="/auth">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    height={40}
                    width={40}
                  >
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                  </svg>
                </Link>
              </li>
            </div>
          </div>
        </ul>
      </nav>
    )
  );
};

export default Navigation;
