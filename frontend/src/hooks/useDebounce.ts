import { useState, useEffect } from 'react';

/**
 * A hook that delays updating a value for the specified delay time
 * Useful for search inputs to prevent too many API calls
 * 
 * @param value The value to debounce
 * @param delay The delay time in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
} 