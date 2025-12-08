import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const link = ({ isActive }) => 'nav-link' + (isActive ? ' active' : '');
  const sidebar = {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
    padding: '1rem',
    width: '150px',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#f8f9fa',
    borderRight: '1px solid #ddd',
  };

  return (
    <nav style={sidebar}>
      <NavLink to="/home" className={link}>
        Home
      </NavLink>
      <NavLink to="/players" className={link}>
        Players
      </NavLink>
      <NavLink to="/top5" className={link}>
        Top 5 List
      </NavLink>
      <NavLink to="/standings" className={link}>
        Standings
      </NavLink>
      <NavLink to="/teams" className={link}>
        Teams
      </NavLink>
    </nav>
  );
}
