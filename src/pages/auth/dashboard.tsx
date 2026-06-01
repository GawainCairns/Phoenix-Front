import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center flex-grow mt-4">
        <div className="w-full max-w-2xl p-4 border border-gray-300 rounded-2xl">
          <p className="text-gray-600">This is your dashboard where you can manage your account and view your activity.</p>
          <div className="flex flex-col mt-4 mb-2 border-t border-gray-300"></div>
          <button className="px-4 py-2 mx-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">Create New Survey</button>
          <button className="px-4 py-2 mx-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-600">View My Surveys</button>
          <p className="flex flex-col mt-4 mb-2 border-t border-gray-300"> Stats </p>
          <div className="flex flex-col p-4 mt-4 mb-2 border border-gray-300 rounded"></div>
          <p className="text-gray-600">You have created 5 surveys and have 20 responses.</p>
          


        </div>
      </main>
      <Footer />
    </div>
  );
}