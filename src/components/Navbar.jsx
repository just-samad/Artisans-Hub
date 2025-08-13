import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const hideOnPaths = ['/', '/login', '/register'];
  if (hideOnPaths.includes(location.pathname)) return null;

  const handleLogout = () => {
    // TODO: Replace with actual auth logic
    localStorage.removeItem('token'); 
  window.location.href = '/login'; 
  };


  return (
    <nav className="navbar">
      <div className="nav-logo">ArtisanHub</div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><NavLink to="/home" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
        <li><NavLink to="/user-profile" onClick={() => setMenuOpen(false)}>Profile</NavLink></li>
        <li><NavLink to="/faq" onClick={() => setMenuOpen(false)}>FAQ</NavLink></li>
        <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
        <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</NavLink></li>
        <li><NavLink to="/terms" onClick={() => setMenuOpen(false)}>Terms & Services</NavLink></li>
      </ul>

      <div className="nav-logout" onClick={handleLogout}>
        <FiLogOut size={22} />
        <span>Logout</span>
      </div>
    </nav>
  );
};

export default Navbar;
