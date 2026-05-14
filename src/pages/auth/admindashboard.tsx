import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Welcome to the Admin Dashboard!</h2>
      </div>
      <Footer />
    </div>
  );
}
