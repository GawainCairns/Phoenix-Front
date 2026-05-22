import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';

import { Credentials } from '../../types/api';
import { login } from '../../services/auth';

async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  // Handle login logic here
  const formData = new FormData(event.currentTarget);
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  console.log('Email:', email);
  console.log('Password:', password);

  try {
    const creds: Credentials = { email, password };
    const user = await login(creds);
    alert(`Logged in as ${user.name} (mock)`);
  } catch (err: any) {
    alert(`Login failed: ${err.message}`);
  }
}

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="w-full max-w-sm p-4 border border-gray-300 rounded-2xl">
          <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">Login</h2>
          <form className="flex flex-col border-gray-300 rounded" onSubmit={handleLogin}>
            <div className="flex flex-col mt-2 mb-2 border-t border-gray-300"></div>
            <div className="flex flex-col mb-2">
              <label htmlFor="email">Email:</label>
              <input className="p-1 border border-gray-300 rounded-lg" type="email" id="email" name="email" required />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="password">Password:</label>
              <input className="p-1 border border-gray-300 rounded-lg" type="password" id="password" name="password" required />
            </div>
            <div className="flex flex-col mt-2 mb-2 border-t border-gray-300"></div>
            <div>
              <Link className="text-blue-500" to="/register">Don't have an account? Register</Link>
            </div>
            <button className="p-2 text-white bg-blue-500 rounded-lg" type="submit">Login</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}