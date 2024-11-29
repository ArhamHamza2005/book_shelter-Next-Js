// components/Navbar.tsx
'use client';

import Link from 'next/link';
// import About from './About/About';
import { useState } from 'react';
import Router from 'next/router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-semibold">
          <Link href="/">Book Shelter</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10">
        <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link href="/books" className="text-white hover:text-gray-300">
            All Books
          </Link>
         
          <Link href="/order" className="text-white hover:text-gray-300">
           Order
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:hidden mt-4 space-y-4 bg-blue-700 text-white p-4`}
      >
        <Link href="/" className="block hover:text-gray-300">
          Home
        </Link>
        <Link href="/about" className="block hover:text-gray-300">
          About
        </Link>
        <Link href="/contact" className="block hover:text-gray-300">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
