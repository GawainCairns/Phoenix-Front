import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useParams } from 'react-router-dom';

export default function Response() {
  const { id } = useParams();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  function handleChange(key: string, value: string) {
    setAnswers((s) => ({ ...s, [key]: value }));
  }

  function submit() {
    console.log('Submit response for', id, answers);
    alert('Response submitted (console log)');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6 pt-20">
        <div className="max-w-2xl p-4 mx-auto border rounded">
          <h2 className="mb-2 text-2xl font-bold">Respond to Survey {id}</h2>
          <div className="mb-3">
            <label className="block mb-1">Q1: How satisfied are you?</label>
            <select className="w-full p-2 border rounded" onChange={(e) => handleChange('Q1', e.target.value)}>
              <option value="">Select</option>
              <option value="Very satisfied">Very satisfied</option>
              <option value="Satisfied">Satisfied</option>
              <option value="Neutral">Neutral</option>
              <option value="Dissatisfied">Dissatisfied</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block mb-1">Q2: Additional feedback</label>
            <textarea className="w-full p-2 border rounded" onChange={(e) => handleChange('Q2', e.target.value)} />
          </div>
          <div>
            <button className="px-4 py-2 text-white bg-blue-600 rounded" onClick={submit}>Submit</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}