import React, { useState } from 'react';
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useParams, Link } from 'react-router-dom';

type ResponseItem = { id: number; respondent: string; answers: Record<string, string> };

export default function ResponseList() {
  const { id } = useParams();
  const [responses] = useState<ResponseItem[]>([
    { id: 1, respondent: 'Guest A', answers: { Q1: 'Yes', Q2: 'Good' } },
    { id: 2, respondent: 'Guest B', answers: { Q1: 'No', Q2: 'OK' } },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6 pt-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-4 text-2xl font-bold">Responses for survey {id}</h2>
          <ul>
            {responses.map((r) => (
              <li key={r.id} className="p-3 mb-2 border rounded">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{r.respondent}</div>
                    <div className="text-sm text-gray-600">Answers: {Object.keys(r.answers).length}</div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/surveys/view/${id}`} className="text-blue-600">View Survey</Link>
                    <Link to={`/surveys/response/${id}`} className="text-green-600">Respond</Link>
                  </div>
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
