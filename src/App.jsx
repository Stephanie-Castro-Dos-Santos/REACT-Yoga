import React, { useState, useRef, useContext, useEffect } from "react";
import "./App.css";
import {
  HomeScreen,
  AuthScreen,
  ContactScreen,
  EventScreen,
  CalendarsScreen,
} from "./screens";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./components";
import { AuthContext } from "./contexts/index";
import axios from "axios";

// Configurar Axios para enviar cookies con cada solicitud
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Router>
        <Navigation />

        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/events" element={<EventScreen />} />
          <Route path="/calendars" element={<CalendarsScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
