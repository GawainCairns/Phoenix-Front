import React from "react";

export default function ListSurvey() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <a href="/" className="text-2xl font-bold">Phoenix Surveys</a>
      </header>
      <main className="flex-grow p-6">
        <h2 className="text-3xl font-bold mb-4">Survey List</h2>
        {/* Survey list will go here */}
      </main>
    </div>
  );
}