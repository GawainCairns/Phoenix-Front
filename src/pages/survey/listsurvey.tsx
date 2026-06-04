import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getSurveys, deleteSurvey } from '../../services/survey';
import { Survey } from '../../types/api';

export default function ListSurvey() {
  const { user } = useAuth();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSurveys() {
      try {
        const all = await getSurveys();
        const mine = user?.id
          ? all.filter((s) => String(s.creatorId) === String(user.id))
          : all;
        setSurveys(mine);
      } catch (err: any) {
        setError(err?.message ?? 'Failed to load surveys.');
      } finally {
        setLoading(false);
      }
    }
    loadSurveys();
  }, [user]);

  async function handleDelete(id: string | number) {
    if (!window.confirm('Delete this survey?')) return;
    try {
      await deleteSurvey(id);
      setSurveys((prev) => prev.filter((s) => String(s.id) !== String(id)));
    } catch (err: any) {
      alert(err?.message ?? 'Failed to delete survey.');
    }
  }

  const filtered = surveys.filter((s) =>
    (s.surveyName ?? '').toLowerCase().includes(search.toLowerCase()) ||
    (s.description ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">My Surveys</h2>
            <Link
              to="/surveys/create"
              className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              + New Survey
            </Link>
          </div>

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
              {search ? 'No surveys match your search.' : 'No surveys yet. '}
              {!search && <Link to="/surveys/create" className="text-blue-500 hover:underline">Create one.</Link>}
            </div>
          ) : (
            <ul>
              {filtered.map((s) => (
                <li key={s.id} className="flex items-center justify-between p-3 mb-2 border rounded hover:bg-gray-50">
                  <div>
                    <div className="font-medium">{s.surveyName}</div>
                    <div className="text-sm text-gray-600">{s.description}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Status: <span className="capitalize">{s.status ?? 'draft'}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <Link to={`/surveys/view/${s.id}`} className="text-blue-600 hover:underline">View</Link>
                    <Link to={`/surveys/edit/${s.id}`} className="text-yellow-600 hover:underline">Edit</Link>
                    <Link to={`/surveys/results/${s.id}`} className="text-green-600 hover:underline">Results</Link>
                    <button className="text-red-600 hover:underline" onClick={() => handleDelete(s.id!)}>
                      Delete
                    </button>
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