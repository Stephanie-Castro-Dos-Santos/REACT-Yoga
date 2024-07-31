import React, { useRef, useState } from "react";
import CalendarComponent from "./CalendarComponent";

const HomeComponent = () => {
  return (
    <div>
      <h1>Bienvenido a HOME</h1>
      <div id="calendar">
        <CalendarComponent />
      </div>
    </div>
  );
};

export default HomeComponent;
