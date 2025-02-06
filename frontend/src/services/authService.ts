import axios from 'axios';
import { LoginCredentials, RegisterCredentials, AuthResponse, User } from '../types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/register', credentials);
    const data = response.data;
    if (data.token) {
      localStorage.setItem('token', data.token);
      // Store token timestamp
      localStorage.setItem('tokenTimestamp', Date.now().toString());
    }
    return data;
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    const data = response.data;
    if (data.token) {
      localStorage.setItem('token', data.token);
      // Store token timestamp
      localStorage.setItem('tokenTimestamp', Date.now().toString());
    }
    return data;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
  },

  getCurrentUser(): AuthResponse | null {
    const token = localStorage.getItem('token');
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
    
    if (!token) return null;
    
    try {
      // Check token age (optional, adjust timeout as needed)
      if (tokenTimestamp) {
        const tokenAge = Date.now() - parseInt(tokenTimestamp);
        const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
        if (tokenAge > maxAge) {
          this.logout();
          return null;
        }
      }

      // Decode the JWT token
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      
      // Check if token is expired based on exp claim
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        this.logout();
        return null;
      }

      return {
        user: payload,
        token
      };
    } catch (error) {
      this.logout();
      return null;
    }
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isTokenValid(): boolean {
    const authData = this.getCurrentUser();
    return !!authData;
  }
}; 