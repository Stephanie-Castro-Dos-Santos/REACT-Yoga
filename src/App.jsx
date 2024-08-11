import React, { useState, useRef } from "react";
//import "./App.css";
import UsersList from "./services/api";
import { HomeScreen, AuthScreen, ContactScreen } from "./screens";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./components";

function App() {
  return (
    <div>
      <Router>
        <Navigation />

        <Routes>
          <Route path="/" element={<AuthScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
