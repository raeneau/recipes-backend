'use client';

import { useState } from 'react';
import Link from 'next/link';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-surface-dark border-b border-neutral-200 dark:border-neutral-800">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0">
            <Link 
              href="/"
              className="flex items-center space-x-2"
            >
              <span className="text-2xl text-primary-600 dark:text-primary-400">🍳</span>
              <span className="text-xl font-heading font-semibold text-neutral-900 dark:text-white">
                Raecipes
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white
                         transition-colors px-3 py-2 text-sm font-medium"
            >
              My Recipes
            </Link>
            <Link
              href="/favorites"
              className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white
                         transition-colors px-3 py-2 text-sm font-medium"
            >
              Favorites
            </Link>
            <Link
              href="/categories"
              className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white
                         transition-colors px-3 py-2 text-sm font-medium"
            >
              Categories
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 
                         hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 
                         dark:hover:text-white dark:hover:bg-neutral-800 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu Icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 
                         hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 
                         dark:hover:text-white dark:hover:bg-neutral-800 transition-colors"
            >
              My Recipes
            </Link>
            <Link
              href="/favorites"
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 
                         hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 
                         dark:hover:text-white dark:hover:bg-neutral-800 transition-colors"
            >
              Favorites
            </Link>
            <Link
              href="/categories"
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 
                         hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 
                         dark:hover:text-white dark:hover:bg-neutral-800 transition-colors"
            >
              Categories
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 