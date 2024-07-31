import React, { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
//import "./App.css";
import UsersList from "./services/api";
import AuthComponent from "./components/AuthComponent";
import HomeComponent from "./components/HomeComponent";
import ContactComponent from "./components/ContactComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationComponent from "./components/NavigationComponent";

function App() {
  return (
    <Router>
      <NavigationComponent />

      <Routes>
        <Route path="/" element={<AuthComponent />} />
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/contact" element={<ContactComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
