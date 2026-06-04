import React, { useState } from 'react';
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Link, useNavigate } from 'react-router-dom';
import { UserCreate } from '../../types/api';
import { createUser } from '../../services/auth';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const newUser: UserCreate = { username, email, passwordHash: password, name };
      await createUser(newUser);
      navigate('/login');
    } catch (err: any) {
      setError(err?.message ?? 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="w-full max-w-sm p-4 border border-gray-300 rounded-2xl">
          <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">Register</h2>
          <form className="flex flex-col border-gray-300 rounded" onSubmit={handleRegister}>
            <div className="flex flex-col mt-2 mb-2 border-t border-gray-300"></div>
            {error && (
              <div className="p-2 mb-2 text-sm text-red-700 bg-red-100 border border-red-300 rounded">
                {error}
              </div>
            )}
            <div className="flex flex-col mb-2">
              <label htmlFor="name">Name:</label>
              <input
                className="p-1 border border-gray-300 rounded-lg"
                type="text" id="name" name="name"
                value={name} onChange={(e) => setName(e.target.value)} required
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="username">Username:</label>
              <input
                className="p-1 border border-gray-300 rounded-lg"
                type="text" id="username" name="username"
                value={username} onChange={(e) => setUsername(e.target.value)} required
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="email">Email:</label>
              <input
                className="p-1 border border-gray-300 rounded-lg"
                type="email" id="email" name="email"
                value={email} onChange={(e) => setEmail(e.target.value)} required
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="password">Password:</label>
              <input
                className="p-1 border border-gray-300 rounded-lg"
                type="password" id="password" name="password"
                value={password} onChange={(e) => setPassword(e.target.value)} required
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="confirm-password">Confirm Password:</label>
              <input
                className="p-1 border border-gray-300 rounded-lg"
                type="password" id="confirm-password" name="confirm-password"
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
              />
            </div>
            <div className="flex flex-col mt-2 mb-2 border-t border-gray-300"></div>
            <div className="mb-2">
              <Link className="text-blue-500" to="/login">Already have an account? Login</Link>
            </div>
            <button
              className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              type="submit" disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}