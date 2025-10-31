import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Transactions from "./pages/Transactions";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("token"));

  // Optional: listen to storage changes in case login happens in another tab
  useEffect(() => {
    const handleStorage = () => setIsAuthenticated(!!sessionStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/customers" element={isAuthenticated ? <Customers /> : <Navigate to="/login" />} />
        <Route path="/transactions" element={isAuthenticated ? <Transactions /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
