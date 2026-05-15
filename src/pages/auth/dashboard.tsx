import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Welcome to your dashboard!</h2>
      </main>
      <Footer />
    </div>
  );
}