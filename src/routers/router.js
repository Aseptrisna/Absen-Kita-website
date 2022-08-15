import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  AppsSetup,
  HomeSetup,
  RegisterSetup,
  AbsentSetup,
  SetupDetailViewAbsent,
  SetupRekap
} from "../pages/setup";
import { LoginView } from "../pages/view";
import { getRole, getToken } from "../helpers/jwt";
export default function Routers() {
  if (!getToken()) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/users" element={<LoginView />} />
          <Route path="/apps" element={<LoginView />} />
          <Route path="/register" element={<RegisterSetup />} />
          <Route path="/detail" element={<LoginView />} />
        </Routes>
      </Router>
    );
  } else {
    if (getRole() === "instansi") {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<AbsentSetup />} />
            <Route path="/users" element={<HomeSetup />} />
            <Route path="/apps" element={<AppsSetup />} />
            <Route path="/register" element={<RegisterSetup />} />
            <Route path="/absents" element={<SetupDetailViewAbsent />} />
            <Route path="/detail" element={<SetupRekap />} />
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
            <Route path="/register" element={<RegisterSetup />} />
            <Route path="/detail" element={<LoginView />} />
          </Routes>
        </Router>
      );
    }
  }
}
