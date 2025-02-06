'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { LoginCredentials } from '../../types/auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const { login, isLoginLoading, loginError } = useAuth();

  const onSubmit = async (data: FormData) => {
    login(data as LoginCredentials);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-surface-dark dark:to-surface-darker py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-4xl">🍳</span>
            <span className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">
              Raecipes
            </span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Create one now
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {loginError && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/30 p-4">
                <p className="text-sm text-red-800 dark:text-red-200">
                  Invalid email or password. Please try again.
                </p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className="appearance-none block w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 
                           border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500
                           text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 
                           focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register('password')}
                  className="appearance-none block w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 
                           border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500
                           text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 
                           focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-300 dark:border-neutral-700 
                         text-primary-600 focus:ring-primary-500 dark:bg-neutral-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoginLoading}
              className="w-full flex justify-center items-center px-4 py-3 rounded-lg
                       bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-primary-500 text-white font-medium
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoginLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 