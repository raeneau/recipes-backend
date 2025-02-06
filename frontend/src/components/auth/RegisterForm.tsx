'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { RegisterCredentials } from '../../types/auth';

interface FormSchema {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const formSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data: FormSchema) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const { register: registerUser, isRegisterLoading, registerError } = useAuth();

  const onSubmit = async (data: FormData) => {
    const { confirmPassword, ...credentials } = data;
    registerUser(credentials as RegisterCredentials);
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
              Create your account
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {registerError && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/30 p-4">
                <p className="text-sm text-red-800 dark:text-red-200">
                  {registerError.message || 'Failed to create account. Please try again.'}
                </p>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  {...register('username')}
                  className="appearance-none block w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 
                           border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500
                           text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 
                           focus:border-transparent transition-colors"
                  placeholder="Choose a username"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username.message}</p>
                )}
              </div>
            </div>

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
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  {...register('password')}
                  className="appearance-none block w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 
                           border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500
                           text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 
                           focus:border-transparent transition-colors"
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  {...register('confirmPassword')}
                  className="appearance-none block w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 
                           border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500
                           text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 
                           focus:border-transparent transition-colors"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isRegisterLoading}
              className="w-full flex justify-center items-center px-4 py-3 rounded-lg
                       bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-primary-500 text-white font-medium
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isRegisterLoading ? (
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
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm; 