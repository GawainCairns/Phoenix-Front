import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';

const name = "John Doe";
const username = "johndoe";
const email = "johndoe@example.com";
const description = "This is a sample user profile description.";
const memberSince = "January 1, 2020";
const lastLogin = "June 1, 2024";

export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="w-full max-w-sm border border-gray-300 rounded-2xl p-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Profile</h2>
          <div className="flex flex-col border-gray-300 rounded">
            <div className="border-t border-gray-300 mb-2 mt-2"></div>
            <div className="flex flex-col mb-2">
              <label>Name:</label>
              <input type="text" className="border border-gray-300 rounded-lg p-1 mb-2" value={name} readOnly />
            </div>
            <div className="flex flex-col mb-2">
              <label>Username:</label>
              <input type="text" className="border border-gray-300 rounded-lg p-1 mb-2" value={username} readOnly />
            </div>
            <div className="flex flex-col mb-2">
              <label>Email:</label>
              <input type="email" className="border border-gray-300 rounded-lg p-1 mb-2" value={email} readOnly />
            </div>
            <div className="flex flex-col mb-2">
              <label>Description:</label>
              <textarea className="border border-gray-300 rounded-lg p-1 mb-2 max-h-40" value={description} readOnly />
            </div>
            <div className="flex flex-col mb-2">
              <label>Member since: {memberSince}</label>
            </div>
            <div className="flex flex-col mb-2">
              <label>Last login: {lastLogin}</label>
            </div>
          </div>
          <div className="border-t border-gray-300"></div>
          <button className="bg-blue-500 text-white rounded-lg p-2 mt-4" type="submit">Edit Profile</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
