import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useParams, Link } from 'react-router-dom';
import { getSurveyById } from '../../services/survey';
import { getQuestions } from '../../services/question';
import { getResponses } from '../../services/response';
import { Survey, Question, SurveyResponse } from '../../types/api';

export default function SurveyResults() {
  const { id } = useParams();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError(err?.message ?? 'Failed to load results.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const respondentCount = new Set(responses.map((r) => String(r.respondentId ?? r.id))).size;

  function getAnswerBreakdown(qId: string | number) {
    const qResponses = responses.filter((r) => String(r.questionId) === String(qId));
    const counts: Record<string, number> = {};
    for (const r of qResponses) {
      const key = r.answer ?? '(empty)';
      counts[key] = (counts[key] ?? 0) + 1;
    }
    return { total: qResponses.length, counts };
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-2xl p-4 mx-auto border rounded">
          {loading ? (
            <div className="text-sm text-gray-500">Loading results...</div>
          ) : error ? (
            <div className="text-sm text-red-500">{error}</div>
          ) : (
            <>
              <h2 className="mb-1 text-2xl font-bold">
                Results — {survey?.surveyName}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {respondentCount} respondent(s) · {responses.length} total answers
              </p>

              {questions.length === 0 ? (
                <div className="text-sm text-gray-500">No questions found for this survey.</div>
              ) : (
                <div className="space-y-6">
                  {questions.map((q, i) => {
                    const { total, counts } = getAnswerBreakdown(q.id!);
                    const sortedAnswers = Object.entries(counts).sort((a, b) => b[1] - a[1]);
                    return (
                      <div key={q.id} className="border rounded p-4">
                        <div className="font-semibold mb-2">
                          {i + 1}. {q.question}
                          <span className="ml-2 text-xs text-gray-400 capitalize">({q.type})</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-3">{total} response(s)</div>
                        {total === 0 ? (
                          <div className="text-sm text-gray-400">No responses yet.</div>
                        ) : q.type === 'mc' ? (
                          <div className="space-y-2">
                            {sortedAnswers.map(([answer, count]) => {
                              const pct = Math.round((count / total) * 100);
                              return (
                                <div key={answer}>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>{answer}</span>
                                    <span className="text-gray-500">{count} ({pct}%)</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                      className="bg-blue-500 h-3 rounded-full"
                                      style={{ width: `${pct}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <ul className="text-sm text-gray-700 space-y-1 max-h-40 overflow-y-auto">
                            {responses
                              .filter((r) => String(r.questionId) === String(q.id))
                              .map((r) => (
                                <li key={r.id} className="p-1 border-b last:border-b-0">
                                  {r.answer}
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-4 flex gap-3">
                <Link to={`/surveys/view/${id}`} className="text-blue-600 hover:underline text-sm">
                  Back to Survey
                </Link>
                <Link to={`/surveys/responselist/${id}`} className="text-green-600 hover:underline text-sm">
                  Individual Responses
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}