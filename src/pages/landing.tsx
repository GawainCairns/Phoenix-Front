import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-600 to-blue-500 text-white py-24 px-6 text-center">
          <h2 className="text-5xl font-extrabold mb-4">Create surveys with ease</h2>
          <p className="text-xl mb-8 max-w-xl mx-auto">
            Phoenix Surveys helps you build, share, and analyze surveys.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-indigo-50 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition"
            >
              Log In
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: 'Easy to Build', desc: 'Drag-and-drop builder lets you create surveys in minutes.' },
            { title: 'Share Anywhere', desc: 'Send via link, email, or embed directly in your site.' },
            { title: 'Real-time Results', desc: 'Watch responses come in and analyse data instantly.' },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-white rounded-xl shadow p-8 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
              <p className="text-gray-500">{desc}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
