/**
 * Design System for Raecipes
 * This file contains the core design tokens and utilities for maintaining
 * a consistent visual language throughout the application.
 */

export const colors = {
  // Primary brand colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  // Accent colors for interactive elements
  accent: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  // Semantic colors for different difficulty levels
  difficulty: {
    easy: '#22c55e',
    medium: '#f59e0b',
    hard: '#ef4444',
  },
  // Neutral colors for text and backgrounds
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  // Surface colors for cards and containers
  surface: {
    light: '#ffffff',
    dark: '#1f2937',
    darker: '#111827',
  },
};

export const typography = {
  fonts: {
    sans: 'Inter, system-ui, -apple-system, sans-serif',
    heading: 'Montserrat, Inter, system-ui, sans-serif',
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
};

export const transitions = {
  DEFAULT: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
};

// Common component styles
export const components = {
  button: {
    base: `
      inline-flex items-center justify-center
      px-4 py-2 rounded-lg
      font-medium transition-colors
      focus:outline-none focus:ring-2 focus:ring-offset-2
    `,
    primary: `
      bg-primary-600 text-white
      hover:bg-primary-700
      focus:ring-primary-500
    `,
    secondary: `
      bg-neutral-200 text-neutral-800
      hover:bg-neutral-300
      focus:ring-neutral-400
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700
      focus:ring-red-500
    `,
  },
  input: {
    base: `
      w-full px-3 py-2 rounded-lg
      border border-neutral-300
      bg-white text-neutral-900
      focus:outline-none focus:ring-2 focus:ring-primary-500
      placeholder:text-neutral-400
    `,
    dark: `
      border-neutral-600 bg-neutral-800
      text-white placeholder:text-neutral-500
    `,
  },
  card: {
    base: `
      rounded-xl shadow-md
      bg-surface-light dark:bg-surface-dark
      overflow-hidden
    `,
  },
};

// Responsive breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}; 