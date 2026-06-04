import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getSurveyById, updateSurvey } from '../../services/survey';
import { getQuestions, updateQuestion, createQuestion, deleteQuestion } from '../../services/question';
import { Question } from '../../types/api';

export default function EditSurvey() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('draft');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQText, setNewQText] = useState('');
  const [newQType, setNewQType] = useState('text');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function loadData() {
      try {
        const [survey, allQuestions] = await Promise.all([
          getSurveyById(id!),
          getQuestions(),
        ]);
        setTitle(survey.surveyName ?? '');
        setDescription(survey.description ?? '');
        setStatus(survey.status ?? 'draft');
        const surveyQs = allQuestions.filter(
          (q) => String(q.surveyId) === String(id)
        );
        setQuestions(surveyQs);
      } catch (err: any) {
        setError(err?.message ?? 'Failed to load survey.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  function updateQText(qId: string | number, text: string) {
    setQuestions((prev) =>
      prev.map((q) => (String(q.id) === String(qId) ? { ...q, question: text } : q))
    );
  }

  async function handleAddQuestion() {
    if (!newQText.trim() || !id) return;
    try {
      const created = await createQuestion({
        surveyId: id,
        question: newQText.trim(),
        type: newQType,
        creatorId: user?.id,
      });
      setQuestions((prev) => [...prev, created]);
      setNewQText('');
      setNewQType('text');
    } catch (err: any) {
      setError(err?.message ?? 'Failed to add question.');
    }
  }

  async function handleRemoveQuestion(qId: string | number) {
    if (!window.confirm('Delete this question?')) return;
    try {
      await deleteQuestion(qId);
      setQuestions((prev) => prev.filter((q) => String(q.id) !== String(qId)));
    } catch (err: any) {
      alert(err?.message ?? 'Failed to delete question.');
    }
  }

  async function handleSave() {
    if (!id || !title.trim()) {
      setError('Survey title is required.');
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await updateSurvey(id, {
        surveyName: title.trim(),
        description: description.trim(),
        status,
      });
      await Promise.all(
        questions
          .filter((q) => q.id)
          .map((q) =>
            updateQuestion(q.id!, { question: q.question, type: q.type })
          )
      );
      setSuccess('Survey saved successfully.');
    } catch (err: any) {
      setError(err?.message ?? 'Failed to save survey.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-2xl p-4 mx-auto border rounded">
          <h2 className="mb-4 text-2xl font-bold">Edit Survey</h2>

          {loading ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : (
            <>
              {error && (
                <div className="p-2 mb-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded">{error}</div>
              )}
              {success && (
                <div className="p-2 mb-3 text-sm text-green-700 bg-green-100 border border-green-300 rounded">{success}</div>
              )}

              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea className="w-full p-2 border rounded" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select className="p-2 border rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="draft">Draft</option>
                  <option value="public">Public</option>
                  <option value="invite">Invite only</option>
                </select>
              </div>

              <div className="mb-4 border-t pt-3">
                <h3 className="font-semibold mb-2">Questions</h3>
                {questions.length === 0 ? (
                  <div className="text-sm text-gray-500 mb-2">No questions yet.</div>
                ) : (
                  <ul className="mb-3">
                    {questions.map((q, i) => (
                      <li key={q.id} className="flex items-center gap-2 p-2 my-2 border rounded">
                        <span className="text-gray-500 text-sm">{i + 1}.</span>
                        <input
                          className="flex-1 p-1 border rounded text-sm"
                          value={q.question ?? ''}
                          onChange={(e) => updateQText(q.id!, e.target.value)}
                        />
                        <span className="text-xs text-gray-400 capitalize">{q.type}</span>
                        <button
                          className="text-red-600 text-sm hover:underline"
                          onClick={() => handleRemoveQuestion(q.id!)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex gap-2">
                  <input
                    className="flex-1 p-2 border rounded text-sm"
                    placeholder="New question text"
                    value={newQText}
                    onChange={(e) => setNewQText(e.target.value)}
                  />
                  <select className="p-2 border rounded text-sm" value={newQType} onChange={(e) => setNewQType(e.target.value)}>
                    <option value="text">Text</option>
                    <option value="mc">Multiple Choice</option>
                  </select>
                  <button
                    className="px-3 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-700"
                    onClick={handleAddQuestion}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  onClick={() => navigate(`/surveys/view/${id}`)}
                >
                  View Survey
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}