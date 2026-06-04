import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getSurveys } from '../../services/survey';
import { getResponses } from '../../services/response';
import { Survey, SurveyResponse } from '../../types/api';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [responseCount, setResponseCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    async function loadData() {
      try {
        const [allSurveys, allResponses] = await Promise.all([
          getSurveys(),
          getResponses(),
        ]);
        const mySurveys = allSurveys.filter(
          (s) => String(s.creatorId) === String(user!.id)
        );
        const mySurveyIds = new Set(mySurveys.map((s) => String(s.id)));
        const myResponses = (allResponses as SurveyResponse[]).filter(
          (r) => mySurveyIds.has(String(r.surveyId))
        );
        setSurveys(mySurveys);
        setResponseCount(myResponses.length);
      } catch (err: any) {
        setError(err?.message ?? 'Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  const recentSurveys = surveys.slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center flex-grow p-6">
        <div className="w-full max-w-2xl">
          <h2 className="mb-1 text-2xl font-bold text-gray-800">
            Welcome{user?.name ? `, ${user.name}` : ''}!
          </h2>
          <p className="mb-4 text-gray-500">Here's an overview of your survey activity.</p>

          {error && (
            <div className="p-2 mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-4 mb-6">
            <div className="flex-1 p-4 text-center border border-gray-200 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {loading ? '—' : surveys.length}
              </div>
              <div className="text-sm text-gray-500">Surveys Created</div>
            </div>
            <div className="flex-1 p-4 text-center border border-gray-200 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {loading ? '—' : responseCount}
              </div>
              <div className="text-sm text-gray-500">Total Responses</div>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <Link
              to="/surveys/create"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Create New Survey
            </Link>
            <Link
              to="/surveys/mine"
              className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
            >
              View My Surveys
            </Link>
          </div>

          <div className="border border-gray-200 rounded-lg">
            <div className="px-4 py-3 font-semibold border-b border-gray-200 bg-gray-50 rounded-t-lg">
              Recent Surveys
            </div>
            {loading ? (
              <div className="p-4 text-sm text-gray-500">Loading...</div>
            ) : recentSurveys.length === 0 ? (
              <div className="p-4 text-sm text-gray-500">
                No surveys yet.{' '}
                <Link to="/surveys/create" className="text-blue-500 hover:underline">
                  Create your first survey.
                </Link>
              </div>
            ) : (
              <ul>
                {recentSurveys.map((s) => (
                  <li key={s.id} className="flex items-center justify-between px-4 py-3 border-b last:border-b-0">
                    <div>
                      <div className="font-medium">{s.surveyName}</div>
                      <div className="text-xs text-gray-500">
                        Status: <span className="capitalize">{s.status ?? 'draft'}</span>
                      </div>
                    </div>
                    <div className="flex gap-3 text-sm">
                      <Link to={`/surveys/view/${s.id}`} className="text-blue-500 hover:underline">View</Link>
                      <Link to={`/surveys/edit/${s.id}`} className="text-yellow-600 hover:underline">Edit</Link>
                      <Link to={`/surveys/results/${s.id}`} className="text-green-600 hover:underline">Results</Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}