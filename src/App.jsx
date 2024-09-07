import React, { useState, useRef } from "react";
import "./App.css";
import UsersList from "./services/api";
import { HomeScreen, AuthScreen, ContactScreen, EventScreen } from "./screens";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./components";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
