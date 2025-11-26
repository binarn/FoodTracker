import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddEditFood from './pages/AddEditFood';
import FoodHistory from './pages/FoodHistory';
import Goals from './pages/Goals';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (token && storedUser) {
      setUser({ username: storedUser });
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUser(null);
  };

  const DashboardLayout = ({ children }) => (
    <div className="dashboard-container">
      <Sidebar user={user} logout={logout} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );

  return (
    <Router>
        <Routes>
          <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />

          {/* DASHBOARD ROUTES */}
          <Route path="/" element={token ? <DashboardLayout><Dashboard /></DashboardLayout> : <Navigate to="/login" />} />
          <Route path="/history" element={token ? <DashboardLayout><FoodHistory /></DashboardLayout> : <Navigate to="/login" />} />
          <Route path="/goals" element={token ? <DashboardLayout><Goals /></DashboardLayout> : <Navigate to="/login" />} />
          
          <Route path="/add" element={token ? <DashboardLayout><AddEditFood /></DashboardLayout> : <Navigate to="/login" />} />
          <Route path="/edit/:id" element={token ? <DashboardLayout><AddEditFood /></DashboardLayout> : <Navigate to="/login" />} />
        </Routes>
    </Router>
  );
}

export default App;