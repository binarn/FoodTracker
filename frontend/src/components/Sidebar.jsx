import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({ user, logout }) {
  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div className="logo-text">
        PELACAK<span className="logo-accent">MAKANAN</span>
      </div>

      {/* MENU */}
      <ul className="menu-list">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <span className="menu-icon">🏠</span> Dasbor
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <span className="menu-icon">🍽️</span> Riwayat Makanan
          </NavLink>
        </li>
        <li>
          <NavLink to="/goals" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <span className="menu-icon">🔥</span> Target
          </NavLink>
        </li>
      </ul>

      {/* LOGOUT */}
      <div style={{marginTop: 'auto'}}>
         <div className="menu-item" onClick={logout} style={{cursor: 'pointer', color: '#FF4D4D'}}>
             <span className="menu-icon">🚪</span> Keluar
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;