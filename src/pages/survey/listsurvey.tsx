import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Link } from 'react-router-dom';

type Survey = { id: number; title: string; description: string };

export default function ListSurvey() {
  const [surveys, setSurveys] = useState<Survey[]>([
    { id: 1, title: 'Customer Feedback', description: 'Short feedback survey' },
    { id: 2, title: 'Event RSVP', description: 'RSVP for event' },
  ]);

  function removeSurvey(id: number) {
    setSurveys((s) => s.filter((x) => x.id !== id));
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6 pt-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-4 text-2xl font-bold">My Surveys</h2>
          <ul>
            {surveys.map((s) => (
              <li key={s.id} className="flex items-center justify-between p-3 mb-2 border rounded">
                <div>
                  <div className="font-medium">{s.title}</div>
                  <div className="text-sm text-gray-600">{s.description}</div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/surveys/view/${s.id}`} className="text-blue-600">View</Link>
                  <Link to={`/surveys/edit/${s.id}`} className="text-yellow-600">Edit</Link>
                  <button className="text-red-600" onClick={() => removeSurvey(s.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}