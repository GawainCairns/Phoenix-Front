import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useParams } from 'react-router-dom';

type Question = { id: number; text: string; type: string };

export default function EditSurvey() {
  const { id } = useParams();
  const [title, setTitle] = useState('Sample Survey');
  const [description, setDescription] = useState('Sample description');
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // mock load for edit
    setQuestions([{ id: 1, text: 'How did you hear about us?', type: 'text' }]);
  }, [id]);

  function save() {
    console.log('Save', { id, title, description, questions });
    alert('Saved (console log)');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6 pt-20">
        <div className="max-w-2xl p-4 mx-auto border rounded">
          <h2 className="mb-4 text-2xl font-bold">Edit Survey {id}</h2>
          <div className="mb-2">
            <label className="block text-sm">Title</label>
            <input className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Description</label>
            <textarea className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="mb-2">
            <h3 className="font-semibold">Questions</h3>
            <ul>
              {questions.map((q) => (
                <li key={q.id} className="p-2 my-2 border rounded">{q.text} ({q.type})</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <button className="px-4 py-2 text-white bg-blue-600 rounded" onClick={save}>Save</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}