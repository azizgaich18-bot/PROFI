import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubjectPage from "./pages/Subject";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/subject/:id" element={<SubjectPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
