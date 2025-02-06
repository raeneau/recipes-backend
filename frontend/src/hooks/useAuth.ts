import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '../services/authService';
import { LoginCredentials, RegisterCredentials, User } from '../types/auth';
import { useEffect } from 'react';

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Query for current user with better caching and retry logic
  const { data: user, isLoading, refetch } = useQuery({
    queryKey: ['auth-user'],
    queryFn: () => {
      const authData = authService.getCurrentUser();
      if (!authData) return null;
      return authData.user;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: false,
  });

  // Effect to check token on mount and revalidate
  useEffect(() => {
    const token = authService.getToken();
    if (token && !user) {
      refetch();
    }
  }, [refetch, user]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await authService.login(credentials);
      return response;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], data.user);
      router.push('/');
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const response = await authService.register(credentials);
      return response;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], data.user);
      router.push('/');
    },
  });

  // Logout mutation with cleanup
  const logoutMutation = useMutation({
    mutationFn: async () => {
      authService.logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      // Clear all queries from the cache
      queryClient.clear();
      router.push('/login');
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
} 