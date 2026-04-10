import "../App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { DashboardPage } from "../pages/Dashboard";
import { NotFoundPage } from "../pages/NotFound";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
