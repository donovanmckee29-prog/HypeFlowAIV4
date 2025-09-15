import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleCompassClick = () => {
    navigate('/compass');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-cyan-400/20 m-4">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogoClick}
            className="text-4xl font-bold text-cyan-400 hover:text-white transition-colors"
            aria-label="Go to Home"
          >
            ∞ INFINITY
          </button>
          <div className="hidden md:block text-lg text-gray-300">
            THE SINGULARITY OF SPORTS CARD INTELLIGENCE
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-active' : 'nav'}
            aria-label="Home"
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/grader" 
            className={({ isActive }) => isActive ? 'nav-active' : 'nav'}
            aria-label="AI Grader"
          >
            🔬 AI Grader
          </NavLink>
          
          <NavLink 
            to="/market" 
            className={({ isActive }) => isActive ? 'nav-active' : 'nav'}
            aria-label="Market Scanner"
          >
            📈 Market Scan
          </NavLink>
          
          <NavLink 
            to="/oracle" 
            className={({ isActive }) => isActive ? 'nav-active' : 'nav'}
            aria-label="AI Oracle"
          >
            🌌 Oracle
          </NavLink>
          
          <NavLink 
            to="/portfolio" 
            className={({ isActive }) => isActive ? 'nav-active' : 'nav'}
            aria-label="Portfolio"
          >
            💼 Portfolio
          </NavLink>
          
          <button 
            onClick={handleCompassClick} 
            className="btn"
            aria-label="Investment Compass"
          >
            🧭 Compass
          </button>
        </div>
      </div>
    </nav>
  );
}
