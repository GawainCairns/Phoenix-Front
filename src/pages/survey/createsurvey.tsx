import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { createSurvey } from '../../services/survey';
import { createQuestion } from '../../services/question';

type QuestionDraft = { id: number; text: string; type: string; options: string[] };

export default function CreateSurvey() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('draft');
  const [questions, setQuestions] = useState<QuestionDraft[]>([]);
  const [qText, setQText] = useState('');
  const [qType, setQType] = useState('text');
  const [qOptions, setQOptions] = useState('Option 1\nOption 2');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function generateSurveyCode(): string {
    const letters = Array.from({ length: 5 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26)));
    const digits = Array.from({ length: 4 }, () => String.fromCharCode(48 + Math.floor(Math.random() * 10)));
    const parts = [...letters, ...digits];
    for (let i = parts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = parts[i];
      parts[i] = parts[j];
      parts[j] = tmp;
    }
    return parts.join('');
  }

  function addQuestion() {
    if (!qText.trim()) return;
    const options = qType === 'mc'
      ? qOptions.split('\n').map((o) => o.trim()).filter(Boolean)
      : [];
    setQuestions((prev) => [
      ...prev,
      { id: Date.now(), text: qText.trim(), type: qType, options },
    ]);
    setQText('');
    setQType('text');
    setQOptions('Option 1\nOption 2');
  }

  function removeQuestion(id: number) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  async function handleSubmit(publishStatus: string) {
    if (!title.trim()) {
      setError('Survey title is required.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const code = generateSurveyCode();
      const survey = await createSurvey({
        survey_name: title.trim(),
        description: description.trim(),
        status: publishStatus,
        creator_id: user?.id,
        code,
      });

      // some backends return the new id in different shapes (id, survey_id, insertId, data.id)
      const surveyId = survey?.id ?? survey?.survey_id ?? survey?.insertId ?? survey?.data?.id ?? survey?.surveyId ?? null;
      if (!surveyId) throw new Error('Survey id missing from createSurvey response');

      await Promise.all(
        questions.map((q) =>
          createQuestion({
            survey_id: surveyId,
            question: q.text,
            type: q.type,
            creator_id: user?.id,
          })
        )
      );

      navigate(`/surveys/view/${surveyId}`);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to save survey.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center flex-grow p-6">
        <div className="w-full max-w-2xl p-4 border border-gray-200 rounded">
          <h2 className="mb-4 text-2xl font-bold">Create Survey</h2>

          {error && (
            <div className="p-2 mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded">{error}</div>
          )}

          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium">Title <span className="text-red-500">*</span></label>
            <input className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea className="w-full p-2 border rounded" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Visibility</label>
            <select className="p-2 border rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="draft">Draft (private)</option>
              <option value="public">Public</option>
              <option value="invite">Invite only</option>
            </select>
          </div>

          <div className="pt-3 mb-3 border-t">
            <h3 className="mb-2 font-semibold">Add Question</h3>
            <input
              className="w-full p-2 mb-2 border rounded"
              placeholder="Question text"
              value={qText}
              onChange={(e) => setQText(e.target.value)}
            />
            <select className="p-2 mb-2 border rounded" value={qType} onChange={(e) => setQType(e.target.value)}>
              <option value="text">Text</option>
              <option value="mc">Multiple Choice</option>
            </select>
            {qType === 'mc' && (
              <div className="mb-2">
                <label className="block mb-1 text-sm text-gray-600">Options (one per line)</label>
                <textarea
                  className="w-full p-2 text-sm border rounded"
                  rows={3}
                  value={qOptions}
                  onChange={(e) => setQOptions(e.target.value)}
                />
              </div>
            )}
            <button
              className="px-3 py-1 text-white bg-gray-600 rounded hover:bg-gray-700"
              type="button"
              onClick={addQuestion}
            >
              Add Question
            </button>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Questions Preview</h3>
            {questions.length === 0 ? (
              <div className="text-sm text-gray-500">No questions yet.</div>
            ) : (
              <ul>
                {questions.map((q, i) => (
                  <li key={q.id} className="flex items-start justify-between p-2 my-2 border rounded">
                    <div>
                      <div className="font-medium">{i + 1}. {q.text}</div>
                      <div className="text-xs text-gray-500 capitalize">Type: {q.type}</div>
                      {q.options.length > 0 && (
                        <ul className="mt-1 ml-4 text-xs text-gray-600 list-disc">
                          {q.options.map((o, j) => <li key={j}>{o}</li>)}
                        </ul>
                      )}
                    </div>
                    <button className="ml-4 text-sm text-red-600 hover:underline" onClick={() => removeQuestion(q.id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <button
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
              onClick={() => handleSubmit('draft')}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
              onClick={() => handleSubmit('public')}
              disabled={saving}
            >
              {saving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}