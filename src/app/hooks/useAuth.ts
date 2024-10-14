import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

const API_URL = 'http://127.0.0.1:5000';

export const authService = {
  /**
   * Logs in the user by sending credentials to the server.
   * The token is stored securely in an httpOnly cookie.
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/login`, credentials, {
        withCredentials: true, // Enables sending and receiving cookies
      });

      if (response.data.token) {
        // Store user data (excluding the token) in memory or a secure storage mechanism
        Cookies.set('user', JSON.stringify(response.data.user), {
          secure: process.env.NODE_ENV === 'production', // Ensure cookies are sent over HTTPS
          sameSite: 'Lax', // Prevent CSRF attacks
          httpOnly: false, // The token should be httpOnly (set server-side)
        });
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Login failed: ${error.response?.data?.message || 'Unknown error'}`);
      } else {
        throw new Error('Login failed: Network or server error');
      }
    }
  },

  /**
   * Logs out the user by clearing the user cookie and invalidating the session token.
   */
  logout: async (): Promise<void> => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      Cookies.remove('user'); // Clear user info stored in the cookie
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },

  /**
   * Retrieves the current user by parsing the user information stored in cookies.
   * Does not expose the token directly.
   */
  getCurrentUser: (): AuthResponse['user'] | null => {
    const userStr = Cookies.get('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error('Error parsing user data:', e);
        return null;
      }
    }
    return null;
  },

  /**
   * Retrieves the authentication token securely from httpOnly cookies (handled server-side).
   * This function assumes token handling on the server via cookies.
   */
  getToken: async (): Promise<string | null> => {
    try {
      const response = await axios.get(`${API_URL}/token`, { withCredentials: true });
      return response.data?.token || null;
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  },
};

export function useAuth() {
  const [user, setUser] = useState<AuthResponse['user'] | null>(authService.getCurrentUser());

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  return { user, login, logout };
}
