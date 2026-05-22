import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

type Question = { id: number; text: string; type: string; options: string[] };

export default function CreateSurvey() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [qText, setQText] = useState("");
  const [qType, setQType] = useState("text");

  function addQuestion() {
    if (!qText.trim()) return;
    setQuestions((s) => [
      ...s,
      { id: Date.now(), text: qText, type: qType, options: qType === "mc" ? ["Option 1"] : [] },
    ]);
    setQText("");
    setQType("text");
  }

  function removeQuestion(id: number) {
    setQuestions((s) => s.filter((q) => q.id !== id));
  }

  function saveDraft() {
    console.log("Save draft", { title, description, questions });
    alert("Draft saved (console log)");
  }

  function publish() {
    console.log("Publish", { title, description, questions });
    alert("Survey published (console log)");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center flex-grow p-6 pt-20">
        <div className="w-full max-w-2xl p-4 border border-gray-200 rounded">
          <h2 className="mb-4 text-2xl font-bold">Create Survey</h2>
          <div className="mb-2">
            <label className="block text-sm">Title</label>
            <input className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Description</label>
            <textarea className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="pt-2 mb-2 border-t">
            <h3 className="font-semibold">Add Question</h3>
            <input className="w-full p-2 mb-2 border rounded" placeholder="Question text" value={qText} onChange={(e) => setQText(e.target.value)} />
            <select className="p-2 mb-2 border rounded" value={qType} onChange={(e) => setQType(e.target.value)}>
              <option value="text">Text</option>
              <option value="mc">Multiple Choice</option>
            </select>
            <div>
              <button className="px-3 py-1 mr-2 text-white bg-gray-600 rounded" type="button" onClick={addQuestion}>Add</button>
            </div>
          </div>

          <div className="mb-2">
            <h3 className="font-semibold">Questions Preview</h3>
            {questions.length === 0 && <div className="text-sm text-gray-500">No questions yet.</div>}
            <ul>
              {questions.map((q) => (
                <li key={q.id} className="flex items-center justify-between p-2 my-2 border rounded">
                  <div>
                    <div className="font-medium">{q.text}</div>
                    <div className="text-sm text-gray-600">Type: {q.type}</div>
                  </div>
                  <button className="text-red-600" onClick={() => removeQuestion(q.id)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 text-white bg-blue-600 rounded" onClick={saveDraft}>Save Draft</button>
            <button className="px-4 py-2 text-white bg-green-600 rounded" onClick={publish}>Publish</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}