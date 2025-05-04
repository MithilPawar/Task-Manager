import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-100 text-gray-600 py-4 mt-auto border-t">
    <div className="container mx-auto px-4 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} Task Manager. All rights reserved.</p>
      <div className="mt-2 space-x-4">
        <Link to="/privacy" className="hover:underline hover:text-blue-600">Privacy Policy</Link>
        <Link to="/contact" className="hover:underline hover:text-blue-600">Contact</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
