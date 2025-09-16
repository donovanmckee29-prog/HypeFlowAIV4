import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleCompassClick = () => {
    navigate('/compass');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0a0f1c] to-[#121826] border-b border-white/10">
      <div className="flex items-center justify-between px-10 py-6">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <motion.button
            onClick={handleLogoClick}
            className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent hover:scale-105 transition-all duration-300"
            aria-label="Go to Home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ∞ Infinity Pro
          </motion.button>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `hover:text-cyan-400 transition-colors ${isActive ? 'text-cyan-400' : 'text-white'}`
            }
            aria-label="Home"
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/market" 
            className={({ isActive }) => 
              `hover:text-cyan-400 transition-colors ${isActive ? 'text-cyan-400' : 'text-white'}`
            }
            aria-label="Market Brain"
          >
            Market Brain
          </NavLink>
          
          <NavLink 
            to="/grader" 
            className={({ isActive }) => 
              `hover:text-cyan-400 transition-colors ${isActive ? 'text-cyan-400' : 'text-white'}`
            }
            aria-label="AI Grader"
          >
            AI Grader
          </NavLink>
          
          <NavLink 
            to="/oracle" 
            className={({ isActive }) => 
              `hover:text-cyan-400 transition-colors ${isActive ? 'text-cyan-400' : 'text-white'}`
            }
            aria-label="AI Oracle"
          >
            Oracle
          </NavLink>
          
          <NavLink 
            to="/portfolio" 
            className={({ isActive }) => 
              `hover:text-cyan-400 transition-colors ${isActive ? 'text-cyan-400' : 'text-white'}`
            }
            aria-label="Portfolio"
          >
            Portfolio
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
