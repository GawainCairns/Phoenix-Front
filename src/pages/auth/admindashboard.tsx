import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Welcome to the Admin Dashboard!</h2>
      </main>
      {/*
      total users stat
      total admin stat
      all survey stat
      list of all users with edit and delete button
      - links to user profile
      - links to user surveys
      list of all surveys with edit and delete button
      - links to survey details
      - links to survey results
      */}
      <Footer />
    </div>
  );
}
