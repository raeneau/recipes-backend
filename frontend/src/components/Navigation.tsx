'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

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
            {isAuthenticated ? (
              <>
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

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    {user?.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white
                              transition-colors px-3 py-2 text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white
                            transition-colors px-3 py-2 text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="btn btn-primary text-sm"
                >
                  Create Account
                </Link>
              </div>
            )}
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
            {isAuthenticated ? (
              <>
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 
                           hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 
                           dark:hover:text-white dark:hover:bg-neutral-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Recipes
                </Link>
                <Link
                  href="/favorites"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 
                           hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 
                           dark:hover:text-white dark:hover:bg-neutral-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Favorites
                </Link>
                <Link
                  href="/categories"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 
                           hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 
                           dark:hover:text-white dark:hover:bg-neutral-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>

                <div className="px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {user?.username}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium 
                            text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 
                            dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800 
                            transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 
                            hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 
                            dark:hover:text-white dark:hover:bg-neutral-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 
                            hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 
                            transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 