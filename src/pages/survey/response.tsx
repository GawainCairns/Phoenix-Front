import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getSurveyById } from '../../services/survey';
import { getQuestions } from '../../services/question';
import { createResponse } from '../../services/response';
import { Survey, Question } from '../../types/api';

export default function Response() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  function handleChange(qId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  }

  const answeredCount = Object.values(answers).filter(Boolean).length;
  const progress = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  async function handleSubmit() {
    const unanswered = questions.filter((q) => !answers[String(q.id)]);
    if (unanswered.length > 0) {
      setError('Please answer all questions before submitting.');
      return;
    }
    if (!id) return;
    setSubmitting(true);
    setError(null);
    try {
      await Promise.all(
        questions.map((q) =>
          createResponse({
            surveyId: id,
            questionId: q.id!,
            answer: answers[String(q.id)] ?? '',
            respondentId: user?.id,
          })
        )
      );
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to submit response.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-col items-center justify-center flex-grow p-6">
          <div className="max-w-md text-center">
            <div className="text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2 text-green-600">Response Submitted!</h2>
            <p className="text-gray-600 mb-6">Thank you for completing the survey.</p>
            <button
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              onClick={() => navigate('/surveys')}
            >
              Back to Surveys
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-2xl p-4 mx-auto border rounded">
          {loading ? (
            <div className="text-sm text-gray-500">Loading survey...</div>
          ) : error && !survey ? (
            <div className="text-sm text-red-500">{error}</div>
          ) : (
            <>
              <h2 className="mb-1 text-2xl font-bold">{survey?.surveyName}</h2>
              {survey?.description && (
                <p className="mb-4 text-sm text-gray-600">{survey.description}</p>
              )}

              {questions.length > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{answeredCount} of {questions.length} answered</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="p-2 mb-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded">{error}</div>
              )}

              {questions.length === 0 ? (
                <div className="text-sm text-gray-500">This survey has no questions.</div>
              ) : (
                <div>
                  {questions.map((q, i) => (
                    <div key={q.id} className="mb-4">
                      <label className="block mb-1 font-medium">
                        {i + 1}. {q.question}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      {q.type === 'mc' ? (
                        <select
                          className="w-full p-2 border rounded"
                          value={answers[String(q.id)] ?? ''}
                          onChange={(e) => handleChange(String(q.id), e.target.value)}
                        >
                          <option value="">Select an option</option>
                          <option value="Very satisfied">Very satisfied</option>
                          <option value="Satisfied">Satisfied</option>
                          <option value="Neutral">Neutral</option>
                          <option value="Dissatisfied">Dissatisfied</option>
                        </select>
                      ) : (
                        <textarea
                          className="w-full p-2 border rounded"
                          rows={3}
                          placeholder="Your answer..."
                          value={answers[String(q.id)] ?? ''}
                          onChange={(e) => handleChange(String(q.id), e.target.value)}
                        />
                      )}
                    </div>
                  ))}

                  <button
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Response'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}