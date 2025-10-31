import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Transactions from "./pages/Transactions";
// import Analytics from "./pages/Analytics";

function App() {
 const isAuthenticated = sessionStorage.getItem("token");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/customers" element={isAuthenticated ? <Customers /> : <Navigate to="/login" />} />
        <Route path="/transactions" element={isAuthenticated ? <Transactions /> : <Navigate to="/login" />} />
        {/* <Route path="/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
