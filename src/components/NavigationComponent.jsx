import React, { useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const NavigationComponent = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname === "/";

  return (
    !isAuthRoute && (
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
    )
  );
};

export default NavigationComponent;
