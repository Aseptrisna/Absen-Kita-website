import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppsSetup, HomeSetup, RegisterSetup } from "../pages/setup";
import { LoginView } from "../pages/view";
import { getRole } from "../helpers/jwt";
export default function Routers() {
  if (getRole() === "instansi") {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomeSetup />} />
          <Route path="/users" element={<HomeSetup />} />
          <Route path="/apps" element={<AppsSetup />} />
          <Route path="/register" element={<RegisterSetup />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/users" element={<LoginView />} />
          <Route path="/apps" element={<LoginView />} />
          <Route path="/register" element={<LoginView />} />
        </Routes>
      </Router>
    );
  }
}
