import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppsSetup, HomeSetup, RegisterSetup } from "../pages/setup";

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeSetup />} />
        <Route path="/apps" element={<AppsSetup />} />
        <Route path="/register" element={<RegisterSetup />} />
      </Routes>
    </Router>
  );
}
