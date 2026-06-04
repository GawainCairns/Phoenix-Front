import React, { useEffect, useState } from 'react';
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useParams, Link } from 'react-router-dom';
import { getSurveyById } from '../../services/survey';
import { getQuestions } from '../../services/question';
import { getResponses } from '../../services/response';
import { Survey, Question, SurveyResponse } from '../../types/api';

export default function ResponseList() {
  const { id } = useParams();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function loadData() {
      try {
        const [s, allQs, allRs] = await Promise.all([
          getSurveyById(id!),
          getQuestions(),
          getResponses(),
        ]);
        setSurvey(s);
        setQuestions(allQs.filter((q) => String(q.surveyId) === String(id)));
        setResponses(allRs.filter((r) => String(r.surveyId) === String(id)));
      } catch (err: any) {
        setError(err?.message ?? 'Failed to load responses.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  // Group responses by respondentId
  const grouped = responses.reduce<Record<string, SurveyResponse[]>>((acc, r) => {
    const key = String(r.respondentId ?? 'anonymous');
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  const respondentIds = Object.keys(grouped).filter((rId) =>
    rId.toLowerCase().includes(search.toLowerCase())
  );

  const questionMap = Object.fromEntries(
    questions.map((q) => [String(q.id), q.question ?? `Question ${q.id}`])
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">
              Responses — {survey?.surveyName ?? `Survey ${id}`}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {Object.keys(grouped).length} respondent(s) · {responses.length} total answers
            </p>
          </div>

          {error && (
            <div className="p-2 mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded">{error}</div>
          )}

          <input
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Search by respondent ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {loading ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : respondentIds.length === 0 ? (
            <div className="text-sm text-gray-500">No responses yet.</div>
          ) : (
            <ul>
              {respondentIds.map((rId) => {
                const rResponses = grouped[rId];
                const isExpanded = expandedId === rId;
                return (
                  <li key={rId} className="mb-2 border rounded overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                      onClick={() => setExpandedId(isExpanded ? null : rId)}
                    >
                      <div>
                        <div className="font-medium">
                          {rId === 'anonymous' ? 'Anonymous' : `Respondent #${rId}`}
                        </div>
                        <div className="text-xs text-gray-500">{rResponses.length} answer(s)</div>
                      </div>
                      <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-3 border-t bg-gray-50">
                        <ul className="mt-2 space-y-2">
                          {rResponses.map((r) => (
                            <li key={r.id} className="text-sm">
                                  <span className="font-medium text-gray-700">
                                    {questionMap[String(r.questionId)] ?? `Q${r.questionId}`}:
                                  </span>{' '}
                              <span className="text-gray-600">{r.answer}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-4 flex gap-3">
            <Link to={`/surveys/view/${id}`} className="text-blue-600 hover:underline text-sm">
              Back to Survey
            </Link>
            <Link to={`/surveys/results/${id}`} className="text-green-600 hover:underline text-sm">
              View Results
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
