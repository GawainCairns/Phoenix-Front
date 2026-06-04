import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getSurveyById } from '../../services/survey';
import { getQuestions } from '../../services/question';
import { Survey, Question } from '../../types/api';

export default function ViewSurvey() {
  const { id } = useParams();
  const { user } = useAuth();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function loadData() {
      try {
        const [s, allQs] = await Promise.all([
          getSurveyById(id!),
          getQuestions(),
        ]);
        setSurvey(s);
        setQuestions(allQs.filter((q) => String(q.surveyId) === String(id)));
      } catch (err: any) {
        setError(err?.message ?? 'Failed to load survey.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const isOwner = user?.id && survey?.creatorId && String(user.id) === String(survey.creatorId);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-2xl p-4 mx-auto border rounded">
          {loading ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-sm text-red-500">{error}</div>
          ) : !survey ? (
            <div className="text-sm text-gray-500">Survey not found.</div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-2xl font-bold">{survey.surveyName}</h2>
                <span className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${
                  survey.status === 'public' ? 'bg-green-100 text-green-700' :
                  survey.status === 'invite' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {survey.status ?? 'draft'}
                </span>
              </div>

              {survey.description && (
                <p className="mb-4 text-sm text-gray-600">{survey.description}</p>
              )}

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Questions ({questions.length})</h3>
                {questions.length === 0 ? (
                  <p className="text-sm text-gray-500">No questions added yet.</p>
                ) : (
                  <ol className="ml-6 list-decimal">
                    {questions.map((q) => (
                      <li key={q.id} className="mb-2">
                        <span>{q.question}</span>
                        <span className="ml-2 text-xs text-gray-400 capitalize">({q.type})</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-3 border-t">
                <Link
                  to={`/surveys/response/${id}`}
                  className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Respond
                </Link>
                {isOwner && (
                  <>
                    <Link
                      to={`/surveys/edit/${id}`}
                      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/surveys/responselist/${id}`}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      View Responses
                    </Link>
                    <Link
                      to={`/surveys/results/${id}`}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                    >
                      Results
                    </Link>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}