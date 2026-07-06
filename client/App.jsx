import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Admin from "./pages/Admin.jsx";
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Profile from "./pages/Profile.jsx";
import NavBar from "./src/components/NavBar.jsx";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <div className="min-h-screen text-slate-900">
        <NavBar />
        <Routes>
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Home />} />
          <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/admin" element={token && role === "admin" ? <Admin /> : <Navigate to="/" />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/" />} />
          <Route path="/services" element={<Services />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;