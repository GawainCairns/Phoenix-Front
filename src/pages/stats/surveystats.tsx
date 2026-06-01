import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function SurveyStats() {
  return (
    <div>
      <Header />
      <main className="container flex-grow px-4 py-8 mx-auto rounded shadow-lg bg-gray-50">
        <h2 className="text-2xl font-bold">Main Content Title</h2>
        <p className="mt-4">This is the main content area. It will grow to fill the available space!</p>
      </main>
      <Footer />
    </div>
  );
}