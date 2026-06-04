import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Link } from 'react-router-dom';
import { getSurveys } from '../../services/survey';
import { Survey } from '../../types/api';

export default function PublicSurveys() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSurveys() {
      try {
        const all = await getSurveys();
        setSurveys(all.filter((s) => s.status === 'public'));
      } catch (err: any) {
        setError(err?.message ?? 'Failed to load public surveys.');
      } finally {
        setLoading(false);
      }
    }
    loadSurveys();
  }, []);

  const filtered = surveys.filter(
    (s) =>
      (s.surveyName ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (s.description ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-1 text-2xl font-bold">Public Surveys</h2>
          <p className="text-sm text-gray-500 mb-4">Open surveys available to everyone.</p>

          <input
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Search surveys..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {error && (
            <div className="p-2 mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded">{error}</div>
          )}

          {loading ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="text-sm text-gray-500">
              {search ? 'No surveys match your search.' : 'No public surveys available right now.'}
            </div>
          ) : (
            <ul>
              {filtered.map((s) => (
                <li key={s.id} className="flex items-center justify-between p-3 mb-2 border rounded hover:bg-gray-50">
                  <div>
                    <div className="font-medium">{s.surveyName}</div>
                    {s.description && (
                      <div className="text-sm text-gray-600">{s.description}</div>
                    )}
                  </div>
                  <div className="flex gap-3 text-sm">
                    <Link to={`/surveys/view/${s.id}`} className="text-blue-600 hover:underline">View</Link>
                    <Link to={`/surveys/response/${s.id}`} className="text-green-600 hover:underline">Respond</Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}