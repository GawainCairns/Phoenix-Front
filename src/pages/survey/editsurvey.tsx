import React from "react";

export default function EditSurvey() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <a href="/" className="text-2xl font-bold">Phoenix Surveys</a>
      </header>
      <main className="flex-grow p-6">
        <h2 className="text-3xl font-bold mb-4">Edit Survey</h2>
        {/* Survey editing form will go here */}
      </main>
    </div>
  );
}