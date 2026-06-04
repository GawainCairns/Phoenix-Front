import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Link, useNavigate } from 'react-router-dom';

import { Credentials } from '../../types/api';
import { login } from '../../services/auth';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const creds: Credentials = { email, password };
      const user = await login(creds);
      setUser(user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message ?? 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="w-full max-w-sm p-4 border border-gray-300 rounded-2xl">
          <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">Login</h2>
          <form className="flex flex-col border-gray-300 rounded" onSubmit={handleLogin}>
            <div className="flex flex-col mt-2 mb-2 border-t border-gray-300"></div>
            {error && (
              <div className="p-2 mb-2 text-sm text-red-700 bg-red-100 border border-red-300 rounded">
                {error}
              </div>
            )}
            <div className="flex flex-col mb-2">
              <label htmlFor="email">Email:</label>
              <input
                className="p-1 border border-gray-300 rounded-lg"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="password">Password:</label>
              <input
                className="p-1 border border-gray-300 rounded-lg"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mt-2 mb-2 border-t border-gray-300"></div>
            <div className="mb-2">
              <Link className="text-blue-500" to="/register">Don't have an account? Register</Link>
            </div>
            <button
              className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}