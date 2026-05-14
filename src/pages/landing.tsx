import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Landing() {
  return (
    <div>
      <Header />
      <div>
        <main className="flex px-4 py-20">
          <div>
            <h1 className="mb-4 text-4xl font-bold">Welcome to Phoenix Surveys!</h1>
            <p className="mb-6 text-lg">Create and manage surveys with ease.</p>
            <div className="space-x-4 flex flex-wrap gap-2">
              <Link to="/login" className="px-4 py-2 text-white bg-blue-500 rounded">Login</Link>
              <Link to="/register" className="px-4 py-2 text-white bg-green-500 rounded">Register</Link>
              <Link to="/surveys/public" className="px-4 py-2 text-white bg-gray-500 rounded">View Public Surveys</Link>
              <Link to="/admin" className="px-4 py-2 text-white bg-red-500 rounded">Admin Dashboard</Link>
              <Link to="/dashboard" className="px-4 py-2 text-white bg-purple-500 rounded">User Dashboard</Link>
              <Link to="/profile" className="px-4 py-2 text-white bg-yellow-500 rounded">Profile</Link>
              <Link to="/stats/survey/1" className="px-4 py-2 text-white bg-teal-500 rounded">Survey Stats</Link>
              <Link to="/stats/users/1" className="px-4 py-2 text-white bg-indigo-500 rounded">User Stats</Link>
              <Link to="/surveys/create" className="px-4 py-2 text-white bg-pink-500 rounded">Create Survey</Link>
              <Link to="/surveys/edit/1" className="px-4 py-2 text-white bg-orange-500 rounded">Edit Survey</Link>
              <Link to="/surveys/view/1" className="px-4 py-2 text-white bg-cyan-500 rounded">View Survey</Link>
              <Link to="/surveys/response/1" className="px-4 py-2 text-white bg-gray-700 rounded">Submit Response</Link>
              <Link to="/surveys/results/1" className="px-4 py-2 text-white bg-black rounded">View Results</Link>
              <Link to="/surveys/public" className="px-4 py-2 text-white bg-gray-500 rounded">Public Surveys</Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
