import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("token"));

  // Keep auth state in sync if storage changes (e.g. logout in another tab)
  useEffect(() => {
    const handleStorage = () => setIsAuthenticated(!!sessionStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirect root to login or dashboard */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />

        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protected admin routes with layout */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/customers"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <Customers />
              </AdminLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
