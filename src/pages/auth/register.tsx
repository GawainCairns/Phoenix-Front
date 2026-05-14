import React from 'react';
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="w-full max-w-sm border border-gray-300 rounded-2xl p-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Register</h2>
          <form className="flex flex-col border-gray-300 rounded" action="">
            <div className="flex flex-col border-t border-gray-300 mb-2 mt-2"></div>
            <div className="flex flex-col mb-2">
              <label htmlFor="name">Name:</label>
              <input className="border border-gray-300 rounded-lg p-1" type="text" id="name" name="name" required />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="username">Username:</label>
              <input className="border border-gray-300 rounded-lg p-1" type="text" id="username" name="username" />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="email">Email:</label>
              <input className="border border-gray-300 rounded-lg p-1" type="email" id="email" name="email" required />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="password">Password:</label>
              <input className="border border-gray-300 rounded-lg p-1" type="password" id="password" name="password" required />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="confirm-password">Confirm Password:</label>
              <input className="border border-gray-300 rounded-lg p-1" type="password" id="confirm-password" name="confirm-password" required />
            </div>
            <div className="flex flex-col border-t border-gray-300 mb-2 mt-2"></div>
            <div>
              <a className="text-blue-500" href="/login">Already have an account? Login</a>
            </div>
            <button className="bg-blue-500 text-white rounded-lg p-2" type="submit">Register</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
