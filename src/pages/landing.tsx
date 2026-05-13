import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Landing() {
  return (
    <div>
      <Header />
      <div>
        <main className="container px-4 py-20 mx-auto">
          <div>
            <h1 className="mb-4 text-4xl font-bold">Welcome to Phoenix Surveys!</h1>
            <p className="mb-6 text-lg">Create and manage surveys with ease.</p>
            <div className="space-x-4">
              <Link to="/login" className="px-4 py-2 text-white bg-blue-500 rounded">Login</Link>
              <Link to="/register" className="px-4 py-2 text-white bg-green-500 rounded">Register</Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
