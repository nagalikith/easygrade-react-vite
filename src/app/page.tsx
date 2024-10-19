'use client';

import { useState } from 'react';
import { authService, useAuthStore } from './hooks/useAuth';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Updated import


interface LoginCredentials {
  username: string;
  password: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const credentials: LoginCredentials = { username, password };
      await authService.login(credentials);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
  };

  const handleOAuthSignIn = (provider: string) => {
    // Implement OAuth sign-in logic here
    console.log(`Signing in with ${provider}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Cleferr AI</h1>
      <p className="text-lg mb-6">All-in-one grading tool for teachers</p>
        <div className="space-y-4">
          <form onSubmit={handleLogin} className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-2 mb-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mb-2 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            className="flex items-center justify-center bg-white text-gray-700 px-6 py-2 rounded shadow-md hover:bg-gray-100 w-64"
            onClick={() => handleOAuthSignIn('google')}
          >
            <Image src="/google-icon.png" alt="Google" width={20} height={20} className="mr-2" />
            Sign in with Google
          </button>
          <button
            className="flex items-center justify-center bg-[#2F2F2F] text-white px-6 py-2 rounded shadow-md hover:bg-[#1E1E1E] w-64"
            onClick={() => handleOAuthSignIn('microsoft')}
          >
            <Image src="/microsoft-icon.png" alt="Microsoft" width={20} height={20} className="mr-2" />
            Sign in with Microsoft
          </button>
          <button
            className="flex items-center justify-center bg-[#24292e] text-white px-6 py-2 rounded shadow-md hover:bg-[#1b1f23] w-64"
            onClick={() => handleOAuthSignIn('github')}
          >
            <Image src="/github-icon.png" alt="GitHub" width={20} height={20} className="mr-2" />
            Sign in with GitHub
          </button>
        </div>
    </div>
  );
}