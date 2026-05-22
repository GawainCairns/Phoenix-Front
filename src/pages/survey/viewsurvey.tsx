import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useParams, Link } from 'react-router-dom';

export default function ViewSurvey() {
  const { id } = useParams();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6 pt-20">
        <div className="max-w-2xl p-4 mx-auto border rounded">
          <h2 className="mb-2 text-2xl font-bold">Survey {id} - Sample Title</h2>
          <p className="mb-4 text-sm text-gray-600">This is a sample survey description.</p>
          <div className="mb-4">
            <h3 className="font-semibold">Questions</h3>
            <ol className="ml-6 list-decimal">
              <li className="mb-2">How satisfied are you? (Multiple choice)</li>
              <li className="mb-2">Any additional feedback? (Text)</li>
            </ol>
          </div>
          <div className="flex gap-2">
            <Link to={`/surveys/response/${id}`} className="px-3 py-1 text-white bg-blue-600 rounded">Respond</Link>
            <Link to={`/surveys/responses/${id}`} className="px-3 py-1 bg-gray-200 rounded">View Responses</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}