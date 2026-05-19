import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';


function handleLogin(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  // Handle login logic here
  const formData = new FormData(event.currentTarget);
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  console.log('Email:', email);
  console.log('Password:', password);
}

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="w-full max-w-sm border border-gray-300 rounded-2xl p-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Login</h2>
          <form className="flex flex-col border-gray-300 rounded" onSubmit={handleLogin}>
            <div className="flex flex-col border-t border-gray-300 mb-2 mt-2"></div>
            <div className="flex flex-col mb-2">
              <label htmlFor="email">Email:</label>
              <input className="border border-gray-300 rounded-lg p-1" type="email" id="email" name="email" required />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="password">Password:</label>
              <input className="border border-gray-300 rounded-lg p-1" type="password" id="password" name="password" required />
            </div>
            <div className="flex flex-col border-t border-gray-300 mb-2 mt-2"></div>
            <div>
              <Link className="text-blue-500" to="/register">Don't have an account? Register</Link>
            </div>
            <button className="bg-blue-500 text-white rounded-lg p-2" type="submit">Login</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}