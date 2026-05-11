import React from "react";

export default function ViewSurvey() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <a href="/" className="text-2xl font-bold">Phoenix Surveys</a>
      </header>
      <main className="flex-grow p-6">
        <h2 className="text-3xl font-bold mb-4">View Survey</h2>
        {/* Survey details will go here */}
      </main>
    </div>
  );
}