import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useParams, Link } from 'react-router-dom';
import { getSurveyById } from '../../services/survey';
import { getQuestions } from '../../services/question';
import { getResponses } from '../../services/response';
import { Survey, Question, SurveyResponse } from '../../types/api';

export default function SurveyStats() {
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
        setError(err?.message ?? 'Failed to load stats.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const respondentCount = new Set(
    responses.map((r) => String(r.respondentId ?? r.id))
  ).size;

  const completionRate =
    questions.length > 0 && respondentCount > 0
      ? Math.round((responses.length / (questions.length * respondentCount)) * 100)
      : 0;

  const questionBreakdown = questions.map((q) => {
    const qResponses = responses.filter((r) => String(r.questionId) === String(q.id));
    const counts: Record<string, number> = {};
    for (const r of qResponses) {
      const key = r.answer ?? '(empty)';
      counts[key] = (counts[key] ?? 0) + 1;
    }
    return { question: q, total: qResponses.length, counts };
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="text-sm text-gray-500">Loading stats...</div>
          ) : error ? (
            <div className="text-sm text-red-500">{error}</div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-1">
                Survey Stats — {survey?.surveyName}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Status: <span className="capitalize">{survey?.status ?? 'draft'}</span>
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-4">
                <div className="p-4 text-center border rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{respondentCount}</div>
                  <div className="text-xs text-gray-500 mt-1">Respondents</div>
                </div>
                <div className="p-4 text-center border rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{responses.length}</div>
                  <div className="text-xs text-gray-500 mt-1">Total Answers</div>
                </div>
                <div className="p-4 text-center border rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{questions.length}</div>
                  <div className="text-xs text-gray-500 mt-1">Questions</div>
                </div>
                <div className="p-4 text-center border rounded-lg">
                  <div className="text-3xl font-bold text-orange-500">{completionRate}%</div>
                  <div className="text-xs text-gray-500 mt-1">Completion Rate</div>
                </div>
              </div>

              <h3 className="font-semibold text-lg mb-4">Per-Question Breakdown</h3>
              {questionBreakdown.length === 0 ? (
                <div className="text-sm text-gray-500">No questions found.</div>
              ) : (
                <div className="space-y-4">
                  {questionBreakdown.map(({ question: q, total, counts }, i) => {
                    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
                    return (
                      <div key={q.id} className="border rounded p-4">
                        <div className="font-medium mb-1">
                          {i + 1}. {q.question}
                          <span className="ml-2 text-xs text-gray-400 capitalize">({q.type})</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-3">{total} response(s)</div>
                        {total === 0 ? (
                          <div className="text-sm text-gray-400">No responses yet.</div>
                        ) : (
                          <div className="space-y-2">
                            {sorted.map(([answer, count]) => {
                              const pct = Math.round((count / total) * 100);
                              return (
                                <div key={answer}>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="truncate max-w-xs">{answer}</span>
                                    <span className="text-gray-500 ml-2">{count} ({pct}%)</span>
                                  </div>
                                  <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div
                                      className="bg-blue-400 h-2 rounded-full"
                                      style={{ width: `${pct}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <Link to={`/surveys/view/${id}`} className="text-blue-600 hover:underline text-sm">
                  Back to Survey
                </Link>
                <Link to={`/surveys/results/${id}`} className="text-green-600 hover:underline text-sm">
                  Detailed Results
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