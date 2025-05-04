import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); 

  const toggleMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call logout function from context
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const navLinks = [
    { path: '/dashboard', label: 'Home' },
    { path: '/tasks', label: 'Tasks' },
  ];

  const baseLink =
    'transition-colors duration-300 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md';
  const activeLink = 'text-blue-600 font-semibold';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Show Logout button if authenticated */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 p-1 rounded-md"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen py-2' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col px-4 space-y-2">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)} // Close the menu after clicking a link
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : ''} block`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Show Logout button if authenticated */}
          {isAuthenticated && (
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false); // Close the menu after logging out
              }}
              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
