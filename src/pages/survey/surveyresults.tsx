import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useParams } from 'react-router-dom';

export default function SurveyResults() {
  const { id } = useParams();

  const mockStats = { totalResponses: 42, q1_yes: 30, q1_no: 12 };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6 pt-20">
        <div className="max-w-2xl p-4 mx-auto border rounded">
          <h2 className="mb-2 text-2xl font-bold">Results for survey {id}</h2>
          <div className="mb-2">Total responses: {mockStats.totalResponses}</div>
          <div className="mb-2">Q1 - Yes: {mockStats.q1_yes}</div>
          <div className="mb-2">Q1 - No: {mockStats.q1_no}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}